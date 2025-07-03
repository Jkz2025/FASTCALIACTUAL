import React, { useState } from 'react'
import ButtonFastCali from '../ButtonFastCali.jsx/ButtonFastCali'
import styles from '../../../src/style'
import { Navigate, useNavigate } from 'react-router-dom'
import { useFetchEntradas } from '../Hooks/useFetchEntradas'
const InventarioForm = () => {
    const navigate = useNavigate()

    const [entradas, setEntradas] = useState([])
    useFetchEntradas(setEntradas)

    const OnClickRedirect = () => {
        navigate('/GestionInventarios/IngresoInventario')
    }

    const limitedEntradas = entradas.slice(0, 20);

    return (
        <div className="max-w-4xl mx-auto my-8">
             <div className={`${styles.flexCenter} bg-gradient-to-r from-gray-800 via-gray-900 to-black rounded-lg shadow-lg p-5 mt-10`}>
                <ButtonFastCali text="Ingresar" onClick={OnClickRedirect} />
                <ButtonFastCali text="Buscar" />
                <ButtonFastCali text="Cancelar" />
            </div>
            <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-black rounded-lg shadow-lg p-6 my-8">
                <h1 className="text-2xl font-bold text-white mb-4">Entradas Inventario</h1>
                <div className="overflow-x-auto">
                    <table className="w-full table-auto bg-gray-900 rounded-lg text-white">
                        <thead>
                            <tr>

                                <th className="border px-4 py-2 bg-gray-800">Entrada</th>
                                <th className="border px-4 py-2 bg-gray-800">Proveedor </th>
                                <th className="border px-4 py-2 bg-gray-800">Valor Total</th>
                                <th className="border px-4 py-2 bg-gray-800">Fecha</th>

                            </tr>
                        </thead>
                        <tbody>
                            {limitedEntradas.map((ingreso) => (
                                <tr>
                                        <td className="border px-4 py-2">{ingreso.numero_entrada}</td>
                                        <td className="border px-4 py-2">{ingreso.proveedor}</td>
                                        <td className="border px-4 py-2">{ingreso.valor_total}</td>
                                        <td className="border px-4 py-2">{ingreso.fecha}</td>
                                </tr>
                            ))}



                        </tbody>
                    </table>
                </div>


            </div>
           
        </div>
    )
}

export default InventarioForm
