import React, { useState } from 'react';
import { useFetchMateriales } from '../Hooks/useFetchMateriales';

const Materiales = () => {
  const [materiales, setMateriales] = useState([]);
  useFetchMateriales(setMateriales);

  return (
    <div className="max-w-4xl mx-auto my-8">
      <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-black rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-white mb-4">Materiales</h1>
        <div className="overflow-x-auto">
          <table className="w-full table-auto bg-gray-900 rounded-lg text-white">
            <thead>
              <tr>
                <th className="border px-4 py-2 bg-gray-800">Codigo</th>
                <th className="border px-4 py-2 bg-gray-800">Nombre</th>  
                <th className="border px-4 py-2 bg-gray-800">Categoria</th>
                <th className="border px-4 py-2 bg-gray-800">Costo</th>
              </tr>
            </thead>
            <tbody>
              {materiales.map((material, index) => (
                <tr key={material.id} className={index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-700 hover:bg-gray-600'}>
                  <td className="border px-4 py-2">{material.codigo_material}</td>
                  <td className="border px-4 py-2">{material.name}</td>
                  <td className="border px-4 py-2">{material.categoria}</td>
                  <td className="border px-4 py-2">{material.costo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Materiales;
