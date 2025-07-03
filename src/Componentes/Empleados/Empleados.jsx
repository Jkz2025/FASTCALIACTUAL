import React, { useState } from 'react'
import { useFetchEmpleados } from '../Hooks/useFetchEmpleados'


const Empleados = () => {

    const [empleados, setEmpleados] = useState([])
    useFetchEmpleados(setEmpleados)

    return (
        <div className="max-w-4xl mx-auto my-8">
            <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-black rounded-lg shadow-lg p-6">
                <h1 className="text-2xl font-bold text-white mb-4">Empleados </h1>
                <div className="overflow-x-auto">
                    <table className="w-full table-auto bg-gray-900 rounded-lg text-white">
                        <thead>
                            <tr>
                                <th className="border px-4 py-2 bg-gray-800">Id</th>
                                <th className="border px-4 py-2 bg-gray-800">Nombre</th>
                                <th className="border px-4 py-2 bg-gray-800">Cedula</th>
                                <th className="border px-4 py-2 bg-gray-800">Departamento</th>
                                <th className="border px-4 py-2 bg-gray-800">Ciudad</th>
                                <th className="border px-4 py-2 bg-gray-800">Celular</th>
                                <th className="border px-4 py-2 bg-gray-800">Tipo Empleado</th>
                                <th className="border px-4 py-2 bg-gray-800">Cargo</th>
                                <th className="border px-4 py-2 bg-gray-800">Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {empleados.map((empleado, index) => (
                                <tr key={empleado.id} className={index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-700 hover:bg-gray-600'}>
                                    <td className="border px-4 py-2">{empleado.id}</td>
                                    <td className="border px-4 py-2">{empleado.nombre} {''} {empleado.apellido}</td>
                                    <td className="border px-4 py-2">{empleado.cedula}</td>
                                    <td className="border px-4 py-2">{empleado.departamento}</td>
                                    <td className="border px-4 py-2">{empleado.ciudad}</td>
                                    <td className="border px-4 py-2">{empleado.celular}</td>
                                    <td className="border px-4 py-2">{empleado.tipo_empleado}</td>
                                    <td className="border px-4 py-2">{empleado.cargo}</td>
                                    <td className="border px-4 py-2">{empleado.email_empleado}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Empleados
