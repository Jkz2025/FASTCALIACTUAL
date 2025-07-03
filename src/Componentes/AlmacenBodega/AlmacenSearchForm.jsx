import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../style';
import ButtonFastCali from '../ButtonFastCali.jsx/ButtonFastCali';
import { useFetchDepartamentos } from '../Hooks/useFetchDepartamentos';
import { useFetchCiudades } from '../Hooks/useFetchCiudad';
import { useFetchEmpleados } from '../Hooks/useFetchEmpleados';

const AlmacenSearchForm = () => {
    const navigate = useNavigate();


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
        navigate('/GestionPersonas/CrearEmpleados');
    };

    const handleCancelarClick = () => {
        setShowFilterForm(false);
        setShowCancelButton(false);
        setShowCreateButton(true);
        // Limpiar los campos del formulario al cancelar la búsqueda
        setSearchParams({
            nombre: '',
            id: '',
            cedula: '',
            codigoDepartamento: '',
            codigoCiudad: '',
            tipo_empleado: '',
            email: '',
            celular: '',

        });
    };

   
    return (
        <div className="max-w-4xl mx-auto my-8 mt-10 sm:w-auto">
            <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-black rounded-lg shadow-lg p-6">
                <div className={`${styles.flexCenter} sm:ml-10 ml-0 sm:mt-0 mt-10`}>

                    {showCreateButton && <><ButtonFastCali onClick={handleCreateCliente} text={`Realizar Ingreso`} />  <ButtonFastCali onClick={handleBuscarClick} text={`Buscar Empleado`} /></>}

                    {showFilterForm && (
                        <form className="flex flex-wrap gap-2">

                            {/* ==============================3 PRIMEROS CAMPOS ============================================= */}

                            <div className="flex flex-col sm:flex-row items-center gap-14">

                                <div className="flex flex-col">

                                    <label htmlFor="nombre" className="text-gray-200">Nombre Empleado:</label>
                                    <select
                                        name="nombre"
                                        className="w-full px-4 py-2 rounded-lg bg-gray-700 text-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                                    // value={searchParams.user_name}
                                    // onChange={`handleInputChange`}
                                    >
                                        <option value="" placeholder="Selecciona un cliente">Selecciona un empleado</option>
                                        {empleados.map((empleado) => (
                                            <option key={empleado.id} value={empleado.nombre}>{`${empleado.nombre} ${empleado.apellido}`}</option>
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
                                        <option value="" >Selecciona un Codigo</option>
                                        {empleados.map((empleado) => (
                                            <option key={empleado.id} value={empleado.id}>{`${empleado.id} `}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="codigoCliente" className="text-gray-200">Cedula:</label>
                                    <select
                                        className="w-[150px] px-4 py-2 rounded-lg bg-gray-700 text-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                                        name="cedula"
                                    // value={`searchParams.codigoPedido`}
                                    // onChange={`handleInputChange`}
                                    >
                                        <option value="" >Escriba Cedula</option>
                                        {empleados.map((empleado) => (
                                            <option key={empleado.cedula} value={empleado.cedula}>{`${empleado.cedula} `}</option>
                                        ))}
                                    </select>
                                </div>

                            </div>

                            {/* ==============================CIUDAD Y DEPARTAMENTO ============================================= */}



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

                            {/* ==============================CELULAR / TIPO EMPLEADO / EMAIL ============================================= */}

                            <div className="flex flex-col sm:flex-row items-center gap-14">
                                <div className="flex flex-col items-center">
                                    <label htmlFor="tipo_empleado" className="text-gray-200">Tipo Empleado: </label>
                                    <select
                                        type="text"
                                        id="tipo_empleado"
                                        name="tipo_empleado"
                                        className="w-full px-4 py-2 rounded-lg bg-gray-700 text-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-300"

                                    >
                                        <option value="">Seleccione Tipo</option>
                                        {empleados.map((empleado) => (
                                            <option value="">
                                                {empleado.tipo_empleado}
                                            </option>
                                        ))}

                                    </select>
                                </div>

                                <div className="flex flex-col">
                                    <label htmlFor="Razon social" className="text-gray-200">Email </label>
                                    <select
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="w-full px-4 py-2 rounded-lg bg-gray-700 text-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-300"

                                    >
                                        <option value="">Digite Email</option>
                                        {empleados.map((empleado) => (
                                            <option value="">
                                                {empleado.email_empleado}
                                            </option>
                                        ))}

                                    </select>
                                </div>

                                <div className="flex flex-col">
                                    <label htmlFor="Celular" className="text-gray-200">Celular</label>
                                    <select
                                        type="Celular"
                                        id="celular"
                                        name="celular"
                                        className="w-full px-4 py-2 rounded-lg bg-gray-700 text-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-300"

                                    >
                                        <option value="">Digite Celular</option>
                                        {empleados.map((empleado) => (
                                            <option value="">
                                                {empleado.celular}
                                            </option>
                                        ))}

                                    </select>
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

export default AlmacenSearchForm;