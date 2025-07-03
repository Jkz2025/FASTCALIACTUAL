import React, { useState, useEffect } from "react";
import { supabase } from "../../CreateClient";
import "../../App.css";
import { useFetchUsers } from "../Hooks/useFetchUsers";

const Users = () => {
  const [users, setUsers] = useState([]);
  useFetchUsers(setUsers);
  const limitedUsers = users.slice(0, 10);


  return (
    <div className="max-w-6xl mx-auto my-8">
      <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-black rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-white mb-4">Clientes </h1>
        <div className="overflow-x-auto">
          <table className="w-full table-auto bg-gray-900 rounded-lg text-white">
            <thead>
              <tr>
                <th className="border px-4 py-2 bg-gray-800">Id</th>
                <th className="border px-4 py-2 bg-gray-800">Nombre</th>
                <th className="border px-4 py-2 bg-gray-800">Apellido</th>
                <th className="border px-4 py-2 bg-gray-800">Razon Social</th>
                <th className="border px-4 py-2 bg-gray-800">Lista Precios</th>
                <th className="border px-4 py-2 bg-gray-800">Edad</th>
                <th className="border px-4 py-2 bg-gray-800">Ciudad</th>
                <th className="border px-4 py-2 bg-gray-800">Departamento</th>
                <th className="border px-4 py-2 bg-gray-800">Nit</th>
                <th className="border px-4 py-2 bg-gray-800">Cedula</th>
                <th className="border px-4 py-2 bg-gray-800">Direccionl</th>
                <th className="border px-4 py-2 bg-gray-800">Email</th>
                <th className="border px-4 py-2 bg-gray-800">Telefono</th>
                <th className="border px-4 py-2 bg-gray-800">Tipo Cliente</th>
                <th className="border px-4 py-2 bg-gray-800">Obligaciones tributarias</th>
              </tr>
            </thead>
            <tbody>
              {limitedUsers.map((user, index) => (
                <tr key={user.id} className={index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-700 hover:bg-gray-600'}>
                  <td className="border px-4 py-2">{user.id}</td>
                  <td className="border px-4 py-2">{user.name}</td>
                  <td className="border px-4 py-2">{user.apellido}</td>
                  <td className="border px-4 py-2">{user.razon_social}</td>
                  <td className="border px-4 py-2">{user.listas_precios}</td>
                  <td className="border px-4 py-2">{user.age}</td>
                  <td className="border px-4 py-2">{user.ciudad}</td>
                  <td className="border px-4 py-2">{user.departamento}</td>
                  <td className="border px-4 py-2">{user.nit}</td>
                  <td className="border px-4 py-2">{user.cedula}</td>
                  <td className="border px-4 py-2">{user.direccion}</td>
                  <td className="border px-4 py-2">{user.email}</td>
                  <td className="border px-4 py-2">{user.telefono}</td>
                  <td className="border px-4 py-2">{user.tipo_cliente}</td>
                  <td className="border px-4 py-2">{user.obligacion_tributaria}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default Users;
