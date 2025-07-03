import React, { useRef, useState, useEffect, useCallback } from 'react';
import ReactToPrint from 'react-to-print';
import ButtonFastCali from '../ButtonFastCali.jsx/ButtonFastCali';
import InvoiceGroup from './invoinceGrupo';
import { useFetchFacturas } from '../Hooks/useFetchFacturas';
import { useFetchEmpresas } from '../Hooks/useFetchEmpresa';
import { useFetchDetallesFactura } from '../Hooks/useFetchDetallesFactura';
import { useFetchPedidos } from '../Hooks/useFetchPedidos';
import FormImpresionFacturas from './FormImpresionFacturas';
import { ReusableTable } from '../Reutilizables/TablaReusable/TablaReusable';

export const ImpresionFacturas = () => {
    const [selectedInvoices, setSelectedInvoices] = useState([]);
    const [pedidos, setPedidos] = useState([])
    const [facturas, setFacturas] = useState([])
    const [detalleFacturas, setDetalleFacturas] = useState([])
    const [empresa, setEmpresa] = useState([])
    const [invoices, setInvoices] = useState([])
    const [displayData, setDisplayData] = useState([])
    const [currentDocumentType, setCurrentDocumentType] = useState('factura')
    const [filteredFacturas, setFilteredFacturas] = useState([])
    const [isLoading, setIsLoading ] = useState(true)

    // Hooks para obtener datos
    useFetchFacturas(setFacturas);
    useFetchEmpresas(setEmpresa)
    useFetchDetallesFactura(setDetalleFacturas)
    useFetchPedidos(setPedidos)

    const componentRef = useRef();

    // Define columnas según el tipo de documento que tengas seleccionado
    const getColumnsForDocumentType = (type) => {
        switch (type) {
            case "factura":
                return [
                    { key: "factura_id", title: "Número Factura" },
                    { key: "nombre_receptor", title: "Cliente" },
                    { key: "fecha_facturacion", title: "Fecha" },
                    {
                        key: "valor_total", title: "Total", format: value =>
                            `$${parseFloat(value).toLocaleString('es-CO')}`
                    }
                ];
            case "pedido":
                return [
                    { key: "pedido_id", title: "Número Pedido" },
                    { key: "user_name", title: "Cliente" },
                    { key: "fecha_creacion", title: "Fecha" },
                    {
                        key: "valor_total", title: "Total",
                        format: value => `$${parseFloat(value).toLocaleString('es-CO')}`
                    },
                ]
            default:
                return [];
        }
    }

    const [columns, setColumns] = useState(getColumnsForDocumentType("factura"));


    useEffect(() => {
        if (facturas.length > 0 ) {
            // Ordenar y mostrar las 10 ultimas facturas
            const sortedFacturas = [...facturas]
                .sort((a, b) => new Date(b.fecha_facturacion) - new Date(a.fecha_facturacion))
                .slice(0, 10)

            setDisplayData(sortedFacturas)
            setIsLoading(false)
        }
    }, [facturas, detalleFacturas, empresa])

    // Función para mapear facturas a invoices
    const mapFacturasToInvoices = useCallback(() => {
        return facturas.map(factura => {
            const detalles = detalleFacturas.filter(d => String(d.codigo_pedido) === String(factura.codigo_pedido));

            console.log(`Factura ${factura.codigo_codigo}`)
            console.log("Detalle:", detalles)
            
            return {
                id: factura.id,
                emisor: {
                    nombre: empresa[0]?.razon_social || '',
                    nit: empresa[0]?.numero_documento || '',
                    direccion: empresa[0]?.direccion || '',
                    telefono: empresa[0]?.telefono || '',
                    email: empresa[0]?.email || '',
                },
                receptor: {
                    nombre: factura.nombre_receptor,
                    nit: factura.numero_documento_receptor,
                    direccion: factura.direccion_receptor,
                    telefono: factura.telefono_receptor || "",
                    email: factura.email_receptor || "",
                },
                fecha: factura.fecha_facturacion,
                numeroFactura: factura.factura_id,
                items: detalles,
                subTotal: factura.subtotal,
                iva: factura.iva,
                ivaPorcentaje: factura.iva_porcentaje,
                total: factura.valor_total,
                notas: factura.notas || "Gracias por su compra"
            };
        });
    }, [facturas, detalleFacturas, empresa]);

     // Manejar búsqueda
    const handleSearch = (searchParams) => {
        console.log("Parametros de busqueda:", searchParams);
        const { documentType } = searchParams;
        
        let filtered = [];
        if (documentType === 'factura') {
            filtered = [...facturas];
            
            // Aplicar filtros
            if (searchParams.codigoDocumento) {
                filtered = filtered.filter(factura => 
                    factura.factura_id.includes(searchParams.codigoDocumento)
                );
            }
            
            if (searchParams.cliente) {
                filtered = filtered.filter(factura =>
                    factura.nombre_receptor.toLowerCase().includes(searchParams.cliente.toLowerCase())
                );
            }
            
            if (searchParams.fechaInicio && searchParams.fechaFin) {
                filtered = filtered.filter(factura => {
                    const fechaFactura = new Date(factura.fecha_facturacion);
                    const fechaInicio = new Date(searchParams.fechaInicio);
                    const fechaFin = new Date(searchParams.fechaFin);
                    return fechaFactura >= fechaInicio && fechaFactura <= fechaFin;
                });
            }
            
            // Ordenar y limitar a 10 resultados
            filtered = filtered
                .sort((a, b) => new Date(b.fecha_facturacion) - new Date(a.fecha_facturacion))
                .slice(0, 10);
        }
        
        setDisplayData(filtered);
        setCurrentDocumentType(documentType);
    }

       // Manejar selección de facturas para imprimir
       const handleSelectionChange = (selectedIds) => {
        if (currentDocumentType === 'factura') {
            const invoicesToPrint = mapFacturasToInvoices().filter(invoice => 
                selectedIds.includes(invoice.id)
            );
            
            setSelectedInvoices(invoicesToPrint);
            console.log('Facturas seleccionadas para imprimir:', invoicesToPrint);
        } else {
            console.warn('Solo se pueden imprimir facturas por el momento...');
            setSelectedInvoices([]);
        }
    }

    const handlePrint = () => {
        if (selectedInvoices.length === 0) {
            alert('Por favor selecciona al menos una factura para imprimir')
            return;
        }
        console.log("Imprimiendo facturas:", selectedInvoices)
    }

if (isLoading) {
    return (
        <div className="flex justify-center items-center h-64">
<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500">
</div>
        </div>
    )
}

    return (
        <>
            <div className="max-w-4xl mx-auto my-8 ">

                <FormImpresionFacturas
                    onSearch={handleSearch}
                />

                <ReusableTable
                    columns={getColumnsForDocumentType(currentDocumentType)}
                    data={displayData}
                    selectable={currentDocumentType === 'factura'}
                    onSelectionChange={handleSelectionChange}
                    rowActions={(item) => (
                        <button
                            className='text-blue-400 hover:text-blue-300 transition-colors'
                            onClick={() => console.log("Ver detalle", item)}
                        >Ver Detalle
                        </button>
                    )}
                />

                {currentDocumentType !== 'factura' && (
                    <div className="mt-4 p-4 bg-yellow-800 bg-opacity-50 rounded-lg">
                        <p className="text-yellow-300 text-center">
                            ⚠️ Solo se pueden imprimir facturas por ahora. Los demás documentos están en desarrollo.
                        </p>
                    </div>
                )}

            </div>


            <div className="max-w-6xl mx-auto my-8">
                <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-black rounded-lg shadow-lg p-6">
                    <ReactToPrint
                        trigger={() => <ButtonFastCali text={`Imprimir Seleccionadas (${selectedInvoices.length})`} onClick={handlePrint} />}
                        content={() => componentRef.current}
                        pageStyle={`
                            @page {
                                size: auto;
                                margin: 20mm;
                            }
                            @media print {
                                body {
                                    -webkit-print-color-adjust: exact;
                                }
                            }
                        `}
                    />
                </div>
            </div>
            <div style={{ display: 'none' }}>
                <InvoiceGroup ref={componentRef} invoices={selectedInvoices} />
            </div>
        </>
    );
};

