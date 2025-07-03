// Invoice.js
import React, { forwardRef } from 'react';
import logo from '../../assets/logo.png';


const Invoice = forwardRef(({ data }, ref) => {
    
    const minHeight = Math.min(800,600 + (data.items?.length || 0) * 30)
    
    return (
        <div ref={ref} className="print:block hidden p-5 font-sans text-sm bg-white text-gray-800 "
        style={{minHeight: `${minHeight}px`}}
        >
{/* Encabezado compacto */}


            <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white p-6 rounded-t-lg mb-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold">FACTURA ELECTRÓNICA</h1>
                        <p className="text-gray-300 mt-1">Emitida conforme a la normativa de la DIAN</p>
                    </div>
                    <img src={logo} alt="Logo" className="w-28 h-28" />
                </div>

                <div className="grid grid-cols-2 gap-6 mt-6">
                    <div>
                        <h2 className="text-xl font-semibold mb-2">Emisor</h2>
                        <div className="space-y-1">
                            <p><span className="font-medium">Nombre:</span> {data.emisor.nombre}</p>
                            <p><span className="font-medium">NIT:</span> {data.emisor.nit}</p>
                            <p><span className="font-medium">Dirección:</span> {data.emisor.direccion}</p>
                            <p><span className="font-medium">Teléfono:</span> {data.emisor.telefono}</p>
                            <p><span className="font-medium">Email:</span> {data.emisor.email}</p>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold mb-2">Receptor</h2>
                        <div className="space-y-1">
                            <p><span className="font-medium">Nombre:</span> {data.receptor.nombre}</p>
                            <p><span className="font-medium">NIT:</span> {data.receptor.nit}</p>
                            <p><span className="font-medium">Dirección:</span> {data.receptor.direccion}</p>
                            <p><span className="font-medium">Teléfono:</span> {data.receptor.telefono}</p>
                            <p><span className="font-medium">Email:</span> {data.receptor.email}</p>
                        </div>
                    </div>
                </div>

                <div className="mt-4 flex justify-between">
                    <p><span className="font-medium">Fecha de Emisión:</span> {data.fecha}</p>
                    <p><span className="font-medium">Número de Factura:</span> {data.numeroFactura}</p>
                </div>
            </div>

            {/* Detalles de la factura */}
            <table className="w-full mb-6 border-collapse">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Descripción</th>
                        <th className="border border-gray-300 px-4 py-3 text-center font-semibold">Cantidad</th>
                        <th className="border border-gray-300 px-4 py-3 text-right font-semibold">Valor Unitario</th>
                        <th className="border border-gray-300 px-4 py-3 text-right font-semibold">Valor Total</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(data.items) && data.items.length > 0 ? data.items.map((item, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                            <td className="border border-gray-300 px-4 py-2">{item.descripcion}</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">{item.cantidad}</td>
                            <td className="border border-gray-300 px-4 py-2 text-right">${item.valor_unitario.toLocaleString()}</td>
                            <td className="border border-gray-300 px-4 py-2 text-right">${item.valor_total.toLocaleString()}</td>
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan="4" className="border border-gray-300 px-4 py-2 text-center">No items available</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Totales */}
            <div className="flex justify-end mb-6">
                <div className="w-1/3">
                    <div className="flex justify-between py-2 border-b border-gray-300">
                        <span className="font-semibold">Subtotal:</span>
                        <span>${data.subTotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-300">
                        <span className="font-semibold">IVA ({data.ivaPorcentaje}%):</span>
                        <span>${data.iva.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between py-2 text-lg font-bold">
                        <span>TOTAL:</span>
                        <span>${data.total.toLocaleString()}</span>
                    </div>
                </div>
            </div>

            {/* Información adicional */}
            <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                    <h2 className="text-lg font-semibold mb-2">Método de Pago</h2>
                    <div className="border border-gray-300 rounded-lg p-4">
                        <p className="mb-2"><span className="font-medium">Forma de Pago:</span> Transferencia Bancaria</p>
                        <p><span className="font-medium">Medios de Pago:</span> Tarjeta Crédito</p>
                    </div>
                </div>

                {/* En implementacion... */}

                {/* <div>
                    <h2 className="text-lg font-semibold mb-2">Código QR</h2>
                    <div className="border border-gray-300 rounded-lg p-4 flex justify-center">
                        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-32 h-32 flex items-center justify-center">
                            <span className="text-xs text-gray-500">Código QR</span>
                        </div>
                    </div>
                </div> */}
            </div>

            {/* Notas y pie de página */}
            <div className="border-t border-gray-300 pt-2">
                <h2 className="text-lg font-semibold mb-2">Notas</h2>
                <div className="text-center text-gray-600 text-xs mt-1">
                    <p className="mb-2">Esta factura electrónica es un documento equivalente con plena validez legal según la Resolución 000020 de 2020</p>
                    <p>© {new Date().getFullYear()} FastCali - Todos los derechos reservados</p>
                    <p className="mt-1">www.fastcali.com - info@fastcali.com - Tel: +57 315 7533753</p>
                </div>
            </div>
        </div>
    );
});

export default Invoice;