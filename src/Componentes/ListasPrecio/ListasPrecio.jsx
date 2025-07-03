import React from 'react';
import { useState } from 'react';
import { useFetchListasPrecio } from '../Hooks/useFetchListasPrecio';

const ListasPrecio = () => {
  const [listasPrecio, setListasPrecio] = useState([]);
  useFetchListasPrecio(setListasPrecio);

  return (
      <div className="max-w-7xl mx-auto ">
        {/* Header Card */}
        <div className="bg-slate-900/90 backdrop-blur-sm rounded-b-2xl shadow-2xl p-8 border-x border-b border-slate-800">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-white">
              Listas De Precio
            </h1>
          </div>
        </div>

        {/* Table Section */}
        <div className="mt-8 mx-4 bg-slate-900/90 backdrop-blur-sm rounded-2xl shadow-2xl p-6 border border-slate-800">
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-slate-800 text-gray-200">
                  <th className="px-6 py-3 text-left text-sm font-semibold">Nombre Lista</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Descripción</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Moneda</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Categoría</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Descuento</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {listasPrecio.map((lista) => (
                  <tr 
                    key={lista.id}
                    className="text-gray-300 hover:bg-slate-800/50 transition-colors"
                  >
                    <td className="px-6 py-4">{lista.name}</td>
                    <td className="px-6 py-4">{lista.descripcion}</td>
                    <td className="px-6 py-4">{lista.moneda}</td>
                    <td className="px-6 py-4">{lista.categoria}</td>
                    <td className="px-6 py-4">{lista.descuento} %</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
  );
};

export default ListasPrecio;