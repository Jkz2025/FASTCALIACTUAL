import React from 'react'
import { useFetchBodegas } from '../Hooks/useFetchBodegas';
import { useState } from 'react';
import Button from '../Dashboard/Components/Button';
import styles from '../../../src/style';

const Bodega = () => {

  const [bodegas, setBodegas] = useState([]);


  useFetchBodegas(setBodegas)

  const handleBuscarClick = () => {

  }


  return (
    <div>
      <div className="max-w-4xl mx-auto my-8 " >
        <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-black rounded-lg shadow-lg p-6 ">
          <h1 className="text-2xl font-bold text-white mb-4">Bodegas</h1>
          <div className="overflow-x-auto">
            <table className="w-full table-auto bg-gray-900 rounded-lg text-white">
              <thead>
                <tr >
                  <th className="border px-4 py-2 bg-gray-800">Codigo</th>
                  <th className="border px-4 py-2 bg-gray-800">Nombre</th>
                  <th className="border px-4 py-2 bg-gray-800">Direccion</th>
                  <th className="border px-4 py-2 bg-gray-800">Telefonico</th>
                  <th className="border px-4 py-2 bg-gray-800">Prefijo</th>
                  <th className="border px-4 py-2 bg-gray-800">Consecutivo Inicio</th>
                  <th className="border px-4 py-2 bg-gray-800">Consecutivo Fin</th>
                  <th className="border px-4 py-2 bg-gray-800">Consecutivo Actual</th>
                  <th className="border px-4 py-2 bg-gray-800">Fecha inicio</th>
                  <th className="border px-4 py-2 bg-gray-800">Fecha Fin</th>
                  <th className="border px-4 py-2 bg-gray-800">Resolucion</th>
                  <th className="border px-4 py-2 bg-gray-800">Clave Tecnica</th>
                </tr>
              </thead>
              <tbody>
                {bodegas.map((bod, index) => (
                  <tr key={bod.id} className={index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-700 hover:bg-gray-600'}>
                    <td className="border px-4 py-2">{bod.id}</td>
                    <td className="border px-4 py-2">{bod.name}</td>
                    <td className="border px-4 py-2">{bod.direccion}</td>
                    <td className="border px-4 py-2">{bod.telefono}</td>
                    <td className="border px-4 py-2">{bod.prefijo}</td>
                    <td className="border px-4 py-2">{bod.consecutivo_uno}</td>
                    <td className="border px-4 py-2">{bod.consecutivo_dos}</td>
                    <td className="border px-4 py-2">{bod.consecutivo_actual}</td>
                    <td className="border px-4 py-2">{bod.fecha_inicio}</td>
                    <td className="border px-4 py-2">{bod.fecha_fin}</td>
                    <td className="border px-4 py-2">{bod.resolucion}</td>
                    <td className="border px-4 py-2">{bod.clave_tecnica}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
    

        </div>
        <div className="max-w-4xl mx-auto my-8 " >


</div>
      </div>


    </div>

  )
}

export default Bodega
