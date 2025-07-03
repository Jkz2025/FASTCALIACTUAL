import React from 'react';
import { Search, X } from 'lucide-react';

const EnvioDian = ({ showSearchButton, showFilterForm, handleSearchClick, handleCancelClick, searchParams, handleInputChange }) => {
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header Card */}
        <div className="bg-slate-900/90 backdrop-blur-sm rounded-b-2xl shadow-2xl p-8 border-x border-b border-slate-800">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-white">
              Envío Facturación DIAN
            </h1>
            {showSearchButton && (
              <button
                onClick={handleSearchClick}
                className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-blue-500/25"
              >
                <Search size={20} />
                Buscar
              </button>
            )}
          </div>

          {showFilterForm && (
            <form className="space-y-6 animate-fadeIn">
              {/* Primera fila de campos */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <label className="text-gray-200 font-medium">Tipo Documento</label>
                  <select className="w-full px-4 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200">
                    <option value="">Factura Electrónica</option>
                    <option value="">Nota Crédito</option>
                    <option value="">Nota Débito</option>
                    <option value="">Documento Soporte</option>
                    <option value="">Nómina Electrónica</option>
                  </select>
                </div>
                {/* Resto de los campos... */}
              </div>
            </form>
          )}
        </div>

        {/* Sección de tabla */}
        <div className="mt-8 mx-4 bg-slate-900/90 backdrop-blur-sm rounded-2xl shadow-2xl p-6 border border-slate-800">
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-slate-800 text-gray-200">
                  <th className="px-6 py-3 text-left text-sm font-semibold">Header 1</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Header 2</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Header 3</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                <tr className="text-gray-300 hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4">Content 1</td>
                  <td className="px-6 py-4">Content 2</td>
                  <td className="px-6 py-4">Content 3</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnvioDian;