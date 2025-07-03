import React, { useState } from 'react'
import { useFetchAlmacen } from '../Hooks/useFetchAlmacen'

const Almacen = () => {

    const [almacen, setAlmacen] = useState([])
    useFetchAlmacen(setAlmacen)

    return (
<>

<div className="max-w-4xl mx-auto my-8">
            <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-black rounded-lg shadow-lg p-6">
                <h1 className="text-2xl font-bold text-white mb-4">Almacen Bodega</h1>
                <div className="overflow-x-auto">
                    <table className="w-full table-auto bg-gray-900 rounded-lg text-white">
                        <thead>
                            <tr>
                                <th className="border px-4 py-2 bg-gray-800">Bodega</th>
                                <th className="border px-4 py-2 bg-gray-800">Cod Material</th>
                                <th className="border px-4 py-2 bg-gray-800">Nombre </th>
                                <th className="border px-4 py-2 bg-gray-800">Costo</th>
                                <th className="border px-4 py-2 bg-gray-800">Cantidad</th>
                                <th className="border px-4 py-2 bg-gray-800">Fecha Ingreso</th>

                            </tr>
                        </thead>
                        <tbody>
                        {almacen.map((inv, index) => (
                                <tr key={inv.id} className={index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-700 hover:bg-gray-600'}>
                                        <td className="border px-4 py-2">{inv.nombre_bodega}</td>
                                        <td className="border px-4 py-2">{inv.codigo_material}</td>
                                        <td className="border px-4 py-2">{inv.nombre_material}</td>
                                        <td className="border px-4 py-2">{inv.costo}</td>
                                        <td className="border px-4 py-2">{inv.cantidad}</td>
                                        <td className="border px-4 py-2">{inv.fecha}</td>
                                </tr>
                                ))}


                        </tbody>
                    </table>
                </div>
            </div>
        </div>  
        </>
    )
}

export default Almacen
