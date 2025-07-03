import React, { useState } from "react";
import { useFetchProveedores } from "../Hooks/useFetchProveedores";

const Proveedores = () => {
  const [proveedores, setProveedores] = useState([]);
  useFetchProveedores(setProveedores);

  return (
    <div className="max-w-4xl mx-auto my-8">
      <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-black rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-white mb-4">Proveedores </h1>
        <div className="overflow-x-auto">
          <table className="w-full table-auto bg-gray-900 rounded-lg text-white">
            <thead>
              <tr>
                <th className="border px-4 py-2 bg-gray-800">Id</th>
                <th className="border px-4 py-2 bg-gray-800">Nombre Proveedor</th>
                <th className="border px-4 py-2 bg-gray-800">Razon Social</th>
                <th className="border px-4 py-2 bg-gray-800">Direccion</th>
                <th className="border px-4 py-2 bg-gray-800">Telefono</th>
                <th className="border px-4 py-2 bg-gray-800">Email</th>
                <th className="border px-4 py-2 bg-gray-800">Nit</th>
                <th className="border px-4 py-2 bg-gray-800">Departamento</th>
                <th className="border px-4 py-2 bg-gray-800">Ciudad</th>
              </tr>
            </thead>
            <tbody>
              {proveedores.map((proveedor, index) => (
                <tr key={proveedor.id} className={index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-700 hover:bg-gray-600'}>
                  <td className="border px-4 py-2">{proveedor.id}</td>
                  <td className="border px-4 py-2">{proveedor.nombre_proveedor}</td>
                  <td className="border px-4 py-2">{proveedor.razon_social}</td>
                  <td className="border px-4 py-2">{proveedor.direccion}</td>
                  <td className="border px-4 py-2">{proveedor.telefono}</td>
                  <td className="border px-4 py-2">{proveedor.correo_proveedor}</td>
                  <td className="border px-4 py-2">{proveedor.nit}</td>
                  <td className="border px-4 py-2">{proveedor.departamento}</td>
                  <td className="border px-4 py-2">{proveedor.ciudad}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default Proveedores;
