const soap = require('soap');
const fs = require('fs');
const path = require('path');
const JSZip = require('jszip');
const crypto = require('crypto');
const xmlCrypto = require('xml-crypto');
const DianXMLGenerator = require('./xmlGenerator');

class DianService {
    constructor() {
        this.wsdUrl = 'https://vpfe-hab.dian.gov.co/WcfDianCustomerServices.svc?wsdl';
        this.testSetId = '0de86207-d487-40c0-9eed-daa4086eb7dd';

        //Configurar Certificado de pruebas Dian
        this.certificatePath = path.join(__dirname, '../certificates/certificado_pruebas_dian.p12'); \
        this.certificatePassword = 'Jkz6000@2028'

        this.xmlGenerator = new DianXMLGenerator()

    }

    //Cargar certificado de pruebas
    loadCertificate() {
        try {
            const certBuffer = fs.readFileSync(this.certificatePath)
            return certBuffer;
        } catch (error) {
            console.error('Error al cargar certificado:', error)
            throw new Error('No se pudo cargar el certificado de pruebas');
        }
    }

    //Firmar XML con certifical digital
    async signXML(xmlContent) {
        try {
            const certificate = this.loadCertificate()

            //Configurar firma XAdES-EPES segun requerimientos DIAN
            const sig = new xmlCrypto.SignedXml();

            //Configurar algoritmos segun especificacion Dian
            sig.signingKey = certificate;
            sig.signatureAlgorithm = 'http://www.w3.org/2001/04/xmldsig-more#rsa-sha256';
            sig.canonicalizationAlgorithm = 'http://www.w3.org/2001/10/xml-exc-c14n#';

            //Agregar referencia al documento
            sig.addReference(
                "//*[local-name(.)='Invoice']",
                ['http://www.w3.org/2000/09/xmldsig#enveloped-signature', 'http://www.w3.org/2001/10/xml-exc-c14n#'],
                'http://www.w3.org/2001/04/xmlenc#sha256'
            );

            // Crear firma
            sig.computeSignature(xmlContent, {
                location: { reference: "//*[local-name(.)='ExtensionContent']", action: "append" }
            })

            return sig.getSignedXml()
        } catch (error) {
            console.error('Error al firmar XML:', error)
            throw new Error('No se pudo firmar el XML');

        }
    }

    //Comprimir y codificar Archivo para envio
    async compressAndEncode(xmlContent, fileName) {
        try {
            const zip = new JSZip()
            zip.file(fileName, xmlContent);

            const zipBuffer = await zip.generateAsync({ type: 'nodebuffer' })
            const base64Content = zipBuffer.toString('base64')

            return base64Content;
        } catch (error) {
            console.error('Error comprimiendo:', error)
            throw new Error('No se pudo comprimir el documento');
        }
    }

    //Generar nombre de archivo segun especificaciones DIAN
    generateFileName() {
        // Formato: nitEmisor + tipoDocumento + numeroDocumento + .xml
        const nit = facturaData.emisor.nit.replace(/\D/g, '');//Solo numeros
        const tipoDoc = '01';
        const numero = facturaData.numero_factura.toString().padStart(10, '0')

        return `${nit}${tipoDoc}${numero}.xml`
    }

    //Enviar documento a Dian usando SendTestSetAsync
    async sendTestSetAsync(facturaData) {
        try {
            //1. Generar XML UBL
            console.log('Generando XML UBL')
            const xmlContent = this.xmlGenerator.generateInvoiceXML(facturaData)


            // 2. Firmar digitalmente
            console.log('Firmando documento...')
            const signedXml = await this.signXML(xmlContent)

            // 3. Generar nombre de archivo
            const fileName = this.generateFileName(facturaData)

            // 4. Comprimir y codificar
            console.log('Comprimiendo y codificando...')
            const compressedContent = await this.compressAndEncode(signedXml, fileName)

            // 5. Crear cliente SOAP
            console.log('Conectando con Dian...')
            const client = await soap.createClientAsync(this.wsdlUrl, {
                timeout: 60000,
                forceSoap12Headers: true,
            })

            // 6. Preparar paramentros para SendTestSetAsync
            const sendTestSetArgs = {
                fileName: fileName.replace('.xml', '.zip'),
                contentFile: compressedContent,
                testSetId: this.testSetId,
            }

            console.log('Enviando a Dian'{
                fileName: sendTestSetArgs.fileName,
                testSetId: sendTestSetArgs.testSetId,
                contentLength: compressedContent.length
            })

            // 7. Enviar documentos a Dian
            const [result] = await client.SendTestSetAsyncAsync(sendTestSetArgs)
            console.log('Resultado de envio:', result)

            return {
                success: true,
                trackId: result.SendTestSetAsyncResult,
                fileName: fileName,
                xmlContent: signedXml,
                compressedContent: compressedContent
            }

        } catch (error) {
            console.error('Error enviando a Dian:', error)
            throw new Error('No se pudo enviar el documento a Dian:' + error.message);
        }
    }

    //Consultar estado usando GetStatusAsync
    async getStatusAsync(trackId) {
        try {
     const client = await soap.createClientAsync(this.wsdlUrl, {
        timeout: 60000,
        forceSoap12Headers: true,
    })
    
    const [result] = await client.GetStatusAsyncAsync({ trackId })
    console.log('Estado Dian:', result)

    return {
        success: true,
        status: result.GetStatusAsyncAsyncResult,
        statusCode:  result.GetStatusAsyncAsyncResult?.StatusCode,
        statusMessage: result.GetStatusAsyncAsyncResult?.StatusMessage,
        isDocumentProcessed: result.GetStatusAsyncAsyncResult?.IsDocumentProcessed,
        statusDescription: result.GetStatusAsyncAsyncResult?.StatusDescription,
        errorMessage: result.GetStatusAsyncAsyncResult?.ErrorMessage,
    }
   
    

        } catch (error) {
            
        }
    }

}