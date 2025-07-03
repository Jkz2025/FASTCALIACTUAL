// 1. GENERADOR DE XML UBL 2.1 PARA DIAN
// backend/xmlGenerator.js

const xmlbuilder = require('xmlbuilder');
const moment = require('moment');

class DianXMLGenerator {
  constructor(certificateData) {
    this.certificateData = certificateData;
    this.testSetId = "0de86207-d487-40c0-9eed-daa4086eb7dd"; // Tu TestSetId de DIAN
  }

  // Generar Invoice XML desde datos de Supabase
  generateInvoiceXML(facturaData) {
    const xml = xmlbuilder.create('Invoice', {
      version: '1.0',
      encoding: 'UTF-8',
      standalone: true
    });

    // Namespaces requeridos por DIAN
    xml.att('xmlns', 'urn:oasis:names:specification:ubl:schema:xsd:Invoice-2')
       .att('xmlns:cac', 'urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2')
       .att('xmlns:cbc', 'urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2')
       .att('xmlns:ds', 'http://www.w3.org/2000/09/xmldsig#')
       .att('xmlns:ext', 'urn:oasis:names:specification:ubl:schema:xsd:CommonExtensionComponents-2')
       .att('xmlns:sts', 'dian:gov:co:facturaelectronica:Structures-2-1')
       .att('xmlns:xades', 'http://uri.etsi.org/01903/v1.3.2#')
       .att('xmlns:xades141', 'http://uri.etsi.org/01903/v1.4.1#')
       .att('xmlns:xsi', 'http://www.w3.org/2001/XMLSchema-instance')
       .att('xsi:schemaLocation', 'urn:oasis:names:specification:ubl:schema:xsd:Invoice-2 http://docs.oasis-open.org/ubl/os-UBL-2.1/xsd/maindoc/UBL-Invoice-2.1.xsd');

    // UBL Extensions (requerido para firma)
    const extensions = xml.ele('ext:UBLExtensions');
    const extension = extensions.ele('ext:UBLExtension');
    extension.ele('ext:ExtensionContent');

    // Información básica del documento
    xml.ele('cbc:UBLVersionID', '2.1');
    xml.ele('cbc:CustomizationID', '10');
    xml.ele('cbc:ProfileID', '01'); // Factura de venta
    xml.ele('cbc:ProfileExecutionID', '2'); // Ambiente de pruebas
    xml.ele('cbc:ID', facturaData.numero_factura);
    xml.ele('cbc:UUID', facturaData.cufe || this.generateCUFE(facturaData));
    xml.ele('cbc:IssueDate', moment(facturaData.fecha_emision).format('YYYY-MM-DD'));
    xml.ele('cbc:IssueTime', moment(facturaData.fecha_emision).format('HH:mm:ss-05:00'));
    xml.ele('cbc:InvoiceTypeCode', '01'); // Factura de venta
    xml.ele('cbc:DocumentCurrencyCode', facturaData.moneda || 'COP');
    xml.ele('cbc:LineCountNumeric', facturaData.items.length);

    // Información del emisor (AccountingSupplierParty)
    const supplier = xml.ele('cac:AccountingSupplierParty');
    const supplierParty = supplier.ele('cac:Party');
    
    // Esquemas de identificación del emisor
    const supplierSchemes = supplierParty.ele('cac:PartyIdentification');
    supplierSchemes.ele('cbc:ID', {
      schemeAgencyID: '195',
      schemeAgencyName: 'CO, DIAN (Dirección de Impuestos y Aduanas Nacionales)',
      schemeID: facturaData.emisor.tipo_documento,
      schemeName: this.getTipoDocumentoName(facturaData.emisor.tipo_documento)
    }, facturaData.emisor.nit);

    // Nombre del emisor
    const supplierName = supplierParty.ele('cac:PartyName');
    supplierName.ele('cbc:Name', facturaData.emisor.razon_social);

    // Dirección del emisor
    const supplierAddress = supplierParty.ele('cac:PhysicalLocation').ele('cac:Address');
    supplierAddress.ele('cbc:ID', facturaData.emisor.codigo_municipio);
    supplierAddress.ele('cbc:CityName', facturaData.emisor.ciudad);
    supplierAddress.ele('cbc:CountrySubentity', facturaData.emisor.departamento);
    supplierAddress.ele('cbc:CountrySubentityCode', facturaData.emisor.codigo_departamento);
    const supplierCountry = supplierAddress.ele('cac:Country');
    supplierCountry.ele('cbc:IdentificationCode', 'CO');

    // Información tributaria del emisor
    const supplierTaxScheme = supplierParty.ele('cac:PartyTaxScheme');
    supplierTaxScheme.ele('cbc:RegistrationName', facturaData.emisor.razon_social);
    supplierTaxScheme.ele('cbc:CompanyID', {
      schemeAgencyID: '195',
      schemeAgencyName: 'CO, DIAN (Dirección de Impuestos y Aduanas Nacionales)',
      schemeID: facturaData.emisor.tipo_documento,
      schemeName: this.getTipoDocumentoName(facturaData.emisor.tipo_documento)
    }, facturaData.emisor.nit);
    
    const supplierTaxCategory = supplierTaxScheme.ele('cac:TaxLevelCode', facturaData.emisor.regimen_fiscal);
    const supplierTaxSchemeDetails = supplierTaxScheme.ele('cac:TaxScheme');
    supplierTaxSchemeDetails.ele('cbc:ID', '01');
    supplierTaxSchemeDetails.ele('cbc:Name', 'IVA');

    // Información del receptor (AccountingCustomerParty)
    const customer = xml.ele('cac:AccountingCustomerParty');
    const customerParty = customer.ele('cac:Party');
    
    const customerSchemes = customerParty.ele('cac:PartyIdentification');
    customerSchemes.ele('cbc:ID', {
      schemeAgencyID: '195',
      schemeAgencyName: 'CO, DIAN (Dirección de Impuestos y Aduanas Nacionales)',
      schemeID: facturaData.receptor.tipo_documento,
      schemeName: this.getTipoDocumentoName(facturaData.receptor.tipo_documento)
    }, facturaData.receptor.identificacion);

    const customerName = customerParty.ele('cac:PartyName');
    customerName.ele('cbc:Name', facturaData.receptor.nombre);

    // Dirección del receptor
    const customerAddress = customerParty.ele('cac:PhysicalLocation').ele('cac:Address');
    customerAddress.ele('cbc:ID', facturaData.receptor.codigo_municipio);
    customerAddress.ele('cbc:CityName', facturaData.receptor.ciudad);
    customerAddress.ele('cbc:CountrySubentity', facturaData.receptor.departamento);
    customerAddress.ele('cbc:CountrySubentityCode', facturaData.receptor.codigo_departamento);
    const customerCountry = customerAddress.ele('cac:Country');
    customerCountry.ele('cbc:IdentificationCode', 'CO');

    // Información tributaria del receptor
    const customerTaxScheme = customerParty.ele('cac:PartyTaxScheme');
    customerTaxScheme.ele('cbc:RegistrationName', facturaData.receptor.nombre);
    customerTaxScheme.ele('cbc:CompanyID', {
      schemeAgencyID: '195',
      schemeAgencyName: 'CO, DIAN (Dirección de Impuestos y Aduanas Nacionales)',
      schemeID: facturaData.receptor.tipo_documento,
      schemeName: this.getTipoDocumentoName(facturaData.receptor.tipo_documento)
    }, facturaData.receptor.identificacion);
    
    const customerTaxCategory = customerTaxScheme.ele('cac:TaxLevelCode', facturaData.receptor.regimen_fiscal || 'O-13');
    const customerTaxSchemeDetails = customerTaxScheme.ele('cac:TaxScheme');
    customerTaxSchemeDetails.ele('cbc:ID', '01');
    customerTaxSchemeDetails.ele('cbc:Name', 'IVA');

    // Medios de pago
    const paymentMeans = xml.ele('cac:PaymentMeans');
    paymentMeans.ele('cbc:ID', '1'); // Contado
    paymentMeans.ele('cbc:PaymentMeansCode', facturaData.medio_pago || '10'); // Efectivo por defecto
    paymentMeans.ele('cbc:PaymentDueDate', moment(facturaData.fecha_vencimiento).format('YYYY-MM-DD'));

    // Términos de pago
    const paymentTerms = xml.ele('cac:PaymentTerms');
    paymentTerms.ele('cbc:ReferenceEventCode', '1'); // Fecha de factura
    paymentTerms.ele('cbc:SettlementDiscountPercent', '0.00');

    // Totales de impuestos
    let totalImpuestos = 0;
    let totalBase = 0;
    let totalFactura = 0;

    // Calcular totales
    facturaData.items.forEach(item => {
      const subtotal = item.cantidad * item.precio_unitario;
      const impuesto = subtotal * (item.porcentaje_iva / 100);
      totalBase += subtotal;
      totalImpuestos += impuesto;
      totalFactura += subtotal + impuesto;
    });

    // TaxTotal
    const taxTotal = xml.ele('cac:TaxTotal');
    taxTotal.ele('cbc:TaxAmount', {currencyID: 'COP'}, totalImpuestos.toFixed(2));
    
    const taxSubtotal = taxTotal.ele('cac:TaxSubtotal');
    taxSubtotal.ele('cbc:TaxableAmount', {currencyID: 'COP'}, totalBase.toFixed(2));
    taxSubtotal.ele('cbc:TaxAmount', {currencyID: 'COP'}, totalImpuestos.toFixed(2));
    
    const taxCategory = taxSubtotal.ele('cac:TaxCategory');
    taxCategory.ele('cbc:Percent', '19.00'); // IVA general
    const taxScheme = taxCategory.ele('cac:TaxScheme');
    taxScheme.ele('cbc:ID', '01');
    taxScheme.ele('cbc:Name', 'IVA');

    // LegalMonetaryTotal
    const legalTotal = xml.ele('cac:LegalMonetaryTotal');
    legalTotal.ele('cbc:LineExtensionAmount', {currencyID: 'COP'}, totalBase.toFixed(2));
    legalTotal.ele('cbc:TaxExclusiveAmount', {currencyID: 'COP'}, totalBase.toFixed(2));
    legalTotal.ele('cbc:TaxInclusiveAmount', {currencyID: 'COP'}, totalFactura.toFixed(2));
    legalTotal.ele('cbc:PayableAmount', {currencyID: 'COP'}, totalFactura.toFixed(2));

    // InvoiceLines (Items de la factura)
    facturaData.items.forEach((item, index) => {
      const invoiceLine = xml.ele('cac:InvoiceLine');
      invoiceLine.ele('cbc:ID', index + 1);
      invoiceLine.ele('cbc:InvoicedQuantity', {unitCode: item.unidad_medida || 'NIU'}, item.cantidad);
      invoiceLine.ele('cbc:LineExtensionAmount', {currencyID: 'COP'}, (item.cantidad * item.precio_unitario).toFixed(2));

      // Información del producto/servicio
      const itemInfo = invoiceLine.ele('cac:Item');
      itemInfo.ele('cbc:Description', item.descripcion);
      itemInfo.ele('cbc:Name', item.nombre);
      
      // Clasificación del producto
      const commodityClassification = itemInfo.ele('cac:CommodityClassification');
      commodityClassification.ele('cbc:ItemClassificationCode', {
        listAgencyID: '10',
        listAgencyName: 'GS1 Colombia',
        listID: 'UNSPSC',
        listName: 'GS1 Colombia'
      }, item.codigo_producto || '01010101');

      // Información del impuesto por línea
      const lineTaxTotal = invoiceLine.ele('cac:TaxTotal');
      const lineImpuesto = (item.cantidad * item.precio_unitario) * (item.porcentaje_iva / 100);
      lineTaxTotal.ele('cbc:TaxAmount', {currencyID: 'COP'}, lineImpuesto.toFixed(2));
      
      const lineTaxSubtotal = lineTaxTotal.ele('cac:TaxSubtotal');
      lineTaxSubtotal.ele('cbc:TaxableAmount', {currencyID: 'COP'}, (item.cantidad * item.precio_unitario).toFixed(2));
      lineTaxSubtotal.ele('cbc:TaxAmount', {currencyID: 'COP'}, lineImpuesto.toFixed(2));
      
      const lineTaxCategory = lineTaxSubtotal.ele('cac:TaxCategory');
      lineTaxCategory.ele('cbc:Percent', item.porcentaje_iva.toFixed(2));
      const lineTaxScheme = lineTaxCategory.ele('cac:TaxScheme');
      lineTaxScheme.ele('cbc:ID', '01');
      lineTaxScheme.ele('cbc:Name', 'IVA');

      // Precio
      const price = invoiceLine.ele('cac:Price');
      price.ele('cbc:PriceAmount', {currencyID: 'COP'}, item.precio_unitario.toFixed(2));
      price.ele('cbc:BaseQuantity', {unitCode: item.unidad_medida || 'NIU'}, '1');
    });

    return xml.end({ pretty: true });
  }

  // Generar CUFE (Código Único de Facturación Electrónica)
  generateCUFE(facturaData) {
    const crypto = require('crypto');
    const data = `${facturaData.numero_factura}${facturaData.fecha_emision}${facturaData.total}${facturaData.emisor.nit}${facturaData.receptor.identificacion}`;
    return crypto.createHash('sha384').update(data).digest('hex');
  }

  // Obtener nombre del tipo de documento
  getTipoDocumentoName(codigo) {
    const tipos = {
      '11': 'Cédula de ciudadanía',
      '12': 'Tarjeta de identidad',
      '13': 'Cédula de extranjería',
      '21': 'Tarjeta de extranjería',
      '22': 'Cédula de identidad',
      '31': 'NIT',
      '41': 'Pasaporte',
      '42': 'Documento de identificación extranjero',
      '43': 'Sin identificación del exterior',
      '47': 'PEP',
      '50': 'NIT de otro país',
      '91': 'NUIP'
    };
    return tipos[codigo] || 'NIT';
  }
}

module.exports = DianXMLGenerator;