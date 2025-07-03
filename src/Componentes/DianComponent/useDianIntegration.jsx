import React from 'react'
import { supabase } from '../../CreateClient'
import { useState } from 'react'
import { useFetchFacturas } from '../Hooks/useFetchFacturas'
import { useFetchDetallesFactura } from '../Hooks/useFetchDetallesFactura'
import { useFetchEmpresa } from '../Hooks/useFetchEmpresa'

const useDianIntegration = () => {

    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null);
    const [facturas, setFacturas] = useState('');
    const [detalleFacturas, setDetalleFacturas] = useState('');
    const [empresa, setEmpresa] = useState('');

    useFetchFacturas(setFacturas)
    useFetchDetallesFactura(setDetalleFacturas)
    useFetchEmpresa(setEmpresa)

    // Formatear datos para XML DIAN
    const getFacturaData = (facturaId) => {
        // Encontrar la factura especifica

        const factura = facturas.find(f => f.id === facturaId)
        const emisor = empresa.find(emp => emp.id === factura.emisor_id)
        const receptor = empresa.find(emp => emp.id === factura.receptor_id)
        const detalleFacturas = detalleFacturas.find(detalle => detalle.factura_id === facturaId)


        return {
            numero_factura: factura.numero,
            fecha_emision: factura.fecha_emision,
            fecha_vencimiento: factura.fecha_vencimiento,
            moneda: factura.moneda || 'COP',
            medio_pago: factura.medio_pago,
            emisor: emisor ? {
                nit: emisor.nit,
                tipo_documento: emisor.tipo_documento,
                razon_social: emisor.razon_social,
                ciudad: emisor.ciudad,
                departamento: emisor.departamento,
                codigo_municipio: emisor.codigo_municipio,
                codigo_departamento: emisor.codigo_departamento,
                regimen_fiscal: emisor.regimen_fiscal
            } : {},
            receptor: {
                identificacion: factura.numero_documento_receptor,
                tipo_documento: factura.tipo_documento_receptor,
                nombre: factura.nombre_receptor,
                ciudad: factura.ciudad_receptor,
                departamento: factura.departamento_receptor,
                codigo_municipio: factura.codigo_municipio_receptor,
                codigo_departamento: factura.codigo_departamento_receptor,
                regimen_fiscal: factura.regimen_fiscal_receptor
            },
            items: detalleFacturas.map(item => ({
                nombre: item.descripcion,
                descripcion: item.descripcion,
                codigo_producto: item.material_id,
                cantidad: item.cantidad,
                precio_unitario: item.precio_unitario,
                porcentaje_iva: item.porcentaje_iva,
                unidad_medida: item.unidad_medida || 'NIU'
            })),
            total: factura.total,
            subtotal: factura.subtotal,
            total_impuestos: factura.total_impuestos
        };
    };


    //Enviar factura a Dian
    const enviarFacturaDian = async (facturaId) => {
        setIsLoading(true)
        setError(null)

        try {

            //1. Obtiene los datos formateados
            const facturaData = getFacturaData(facturaId)
            if (!facturaData) throw new Error('Factura no encontrada');

            //2. Envia al backend DIAN
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/dian/enviar-factura`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    facturaData,
                    testSetId: this.testSetId
                })
            })

            const result = await response.json();
            if (!response.ok) throw new Error(result.error || 'Error al enviar la factura a DIAN');

            //3. Actualiza la factura en la base de datos
            const { error: updateError } = await supabase.
                from('facturacion')
                .update({
                    estado_dian: 'enviada',
                    track_id_dian: result.trackId,
                    xml_generado: result.xmlContent,
                    fecha_envio_dian: new Date().toISOString()
                })
                .eq('id', facturaId)

            if (updateError) throw updateError

            return result
        } catch (error) {
            setError(error.message)
            throw error
        } finally {
            setIsLoading(false)
        }
    }


    const consultarEstadoDian = async (trackId) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/dian/consultar-estado`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ trackId })
                })

                const result = await response.json()
                if (!response.ok) throw new Error(result.error || 'Error al consultar el estado de la factura')

                return result

        } catch (error) {
            setError(error.message)
            throw error

        } finally {
            setIsLoading(false)
        }
    }

    return (
        isLoading,
        error,
        enviarFacturaDian,
        consultarEstadoDian
    )

}

export default useDianIntegration