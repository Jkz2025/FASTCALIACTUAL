import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../../src/style';
import ButtonFastCali from '../ButtonFastCali.jsx/ButtonFastCali';
import { useFetchUsers } from '../Hooks/useFetchUsers';
import { useFetchDepartamentos } from '../Hooks/useFetchDepartamentos';
import { useFetchCiudades } from '../Hooks/useFetchCiudad';

const UsersSearchForm = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [departamentos, setDepartamentos] = useState([]);
    const [ciudades, setCiudades] = useState([]);
    const [searchParams, setSearchParams] = useState({
        user_name: '',
        bodega: '',
        fechaInicio: '',
        fechaFin: '',
        codigoPedido: '',
    });

    useFetchUsers(setUsers);
    useFetchDepartamentos(setDepartamentos)
    useFetchCiudades(setCiudades)

    const [showFilterForm, setShowFilterForm] = useState(false);
    const [showCancelButton, setShowCancelButton] = useState(false);
    const [showCreateButton, setShowCreateButton] = useState(true);

    const handleBuscarClick = () => {
        setShowFilterForm(true);
        setShowCancelButton(true);
        setShowCreateButton(false);
        // Lógica para buscar pedidos con los parámetros de búsqueda
        // searchPedidos();
    };

    const handleCreateCliente = () => {
        navigate('/GestionPersonas/CrearClientes');
    };

    const handleCancelarClick = () => {
        setShowFilterForm(false);
        setShowCancelButton(false);
        setShowCreateButton(true);
        // Limpiar los campos del formulario al cancelar la búsqueda
        setSearchParams({
            users: '',
            codigoCliente: '',
            cedula: '',
            razon_social: '',
            codigoPedido: ''
        });
    };

    // const handleInputChange = (e) => {
    //     setSearchParams({
    //         ...searchParams,
    //         [e.target.name]: e.target.value
    //     });
    // };
    return (
        <div className="max-w-4xl mx-auto my-8 mt-10 sm:w-auto">
            <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-black rounded-lg shadow-lg p-6">
                <div className={`${styles.flexCenter} sm:ml-10 ml-0 sm:mt-0 mt-10`}>

                    {showCreateButton && <><ButtonFastCali onClick={handleCreateCliente} text={`Crear Cliente`} />  <ButtonFastCali onClick={handleBuscarClick} text={`Buscar Cliente`} /></>}

                    {showFilterForm && (
                        <form className="flex flex-wrap gap-2">
                            <div className="flex flex-col sm:flex-row items-center gap-14">

                                <div className="flex flex-col">

                                    <label htmlFor="users" className="text-gray-200">Nombre Cliente:</label>
                                    <select
                                        name="users"
                                        className="w-full px-4 py-2 rounded-lg bg-gray-700 text-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                                    // value={searchParams.user_name}
                                    // onChange={`handleInputChange`}
                                    >
                                        <option value="" placeholder="Selecciona un cliente">Selecciona un cliente</option>
                                        {users.map((user) => (
                                            <option key={user.id} value={user.id}>{`${user.name} - ${user.id}`}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="codigoCliente" className="text-gray-200">Código Cliente:</label>
                                    <select
                                        className="w-full px-4 py-2 rounded-lg bg-gray-700 text-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-300"

                                        name="codigoCliente"
                                    // value={`searchParams.codigoPedido`}
                                    // onChange={`handleInputChange`}
                                    >
                                        <option value="" >Selecciona un cliente</option>
                                        {users.map((user) => (
                                            <option key={user.id} value={user.id}>{`${user.id} - ${user.name}`}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="cedula" className="text-gray-200">Cédula</label>
                                    <input
                                        type="number"
                                        id="cedula"
                                        name="cedula"
                                        placeholder="Cédula"
                                        className="w-full px-4 py-2 rounded-lg bg-gray-700 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                                    // value={searchParams.cedula}
                                    // onChange={`handleInputChange`}
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="Nit" className="text-gray-200">Nit</label>
                                    <input
                                        type="number"
                                        id="nit"
                                        name="nit"
                                        placeholder="Nit"
                                        className="w-full px-4 py-2 rounded-lg bg-gray-700 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                                    // value={searchParams.cedula}
                                    // onChange={`handleInputChange`}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row items-center gap-14"> 
                                <div className="flex flex-col">
                                    <label htmlFor="codigoDepartamento" className="text-gray-200">Código Departamento:</label>
                                    <select
                                        className="w-full px-4 py-2 rounded-lg bg-gray-700 text-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                                        name="codigoDepartamento"
                                    // value={`searchParams.codigoPedido`}
                                    // onChange={`handleInputChange`}
                                    >
                                        <option value="" >Selecciona un Departamento</option>
                                        {departamentos.map((dep) => (
                                            <option key={dep.id} value={dep.codigo_dane}>{`${dep.nombre_departamento} - ${dep.codigo_dane}`}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="codigoCiudad" className="text-gray-200">Código Ciudad:</label>
                                    <select
                                        className="w-full px-4 py-2 rounded-lg bg-gray-700 text-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                                        name="codigoDepartamento"
                                    // value={`searchParams.codigoPedido`}
                                    // onChange={`handleInputChange`}
                                    >
                                        <option value="" >Selecciona una Ciudad</option>
                                        {ciudades.map((ciudad) => (
                                            <option key={ciudad.id} value={ciudad.codigo_dane}>{`${ciudad.nombre_ciudad} - ${ciudad.codigo_dane}`}</option>
                                        ))}
                                    </select>
                                </div>

                            </div>
                            <div className="flex flex-col  sm:flex-row items-center gap-14">


                                <div className="flex flex-col">
                                    <label htmlFor="Razon social" className="text-gray-200">Razon social</label>
                                    <select
                                        type="text"
                                        id="razon_social"
                                        name="razon_social"
                                        placeholder="Razon social"
                                        className="w-full px-4 py-2 rounded-lg bg-gray-700 text-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-300"

                                    >
                                        {users.map((user) => (
                                            <option value="">
                                                {user.razon_social}
                                            </option>
                                        ))}

                                    </select>
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="email" className="text-gray-200">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="email"
                                        className="w-full px-4 py-2 rounded-lg bg-gray-700 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-300"

                                    />

                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="telefono" className="text-gray-200">Telefono</label>
                                    <input
                                        type="number"
                                        id="telefono"
                                        name="telefono"
                                        placeholder="Telefono"
                                        className="w-full px-4 py-2 rounded-lg bg-gray-700 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-300"

                                    />

                                </div>
                            </div>
                        </form>
                    )}
                </div>

                {showCancelButton && (
                    <div className="justify-center flex py-4">
                        <ButtonFastCali text="Buscar" onClick={handleBuscarClick} />
                        <ButtonFastCali text="Cancelar" onClick={handleCancelarClick} />
                    </div>
                )}
            </div>

        </div>
    );
};

export default UsersSearchForm;