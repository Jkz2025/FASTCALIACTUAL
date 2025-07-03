import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../../src/style';
import ButtonFastCali from '../ButtonFastCali.jsx/ButtonFastCali';
import { useFetchDepartamentos } from '../Hooks/useFetchDepartamentos';
import { useFetchCiudades } from '../Hooks/useFetchCiudad';
import { useFetchProveedores } from '../Hooks/useFetchProveedores';

const ProveedoresSearchForm = () => {
    const navigate = useNavigate();
    const [proveedores, setProveedores] = useState([]);
    const [departamentos, setDepartamentos] = useState([]);
    const [ciudades, setCiudades] = useState([]);
    const [searchParams, setSearchParams] = useState({
        nombre_proveedor: '',
        razon_social: '',
        direccion: '',
        telefono: '',
        correo_proveedor: '',
        nit: '',
        departamento: '',
        ciudad: ''
    });

    useFetchProveedores(setProveedores);
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
        navigate('/GestionPersonas/CrearProveedores');
    };

    const handleCancelarClick = () => {
        setShowFilterForm(false);
        setShowCancelButton(false);
        setShowCreateButton(true);
        // Limpiar los campos del formulario al cancelar la búsqueda
        setSearchParams({
            nombre_proveedor: '',
            razon_social: '',
            direccion: '',
            telefono: '',
            correo_proveedor: '',
            nit: '',
            departamento: '',
            ciudad: ''
        });
    };


    return (
        <div className="max-w-4xl mx-auto my-8 mt-10 sm:w-auto">
            <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-black rounded-lg shadow-lg p-6">
                <div className={`${styles.flexCenter} sm:ml-10 ml-0 sm:mt-0 mt-10`}>

                    {showCreateButton && <><ButtonFastCali onClick={handleCreateCliente} text={`Crear Proveedor`} />  <ButtonFastCali onClick={handleBuscarClick} text={`Buscar Proveedor`} /></>}

                    {showFilterForm && (
                        <form className="flex flex-wrap gap-2">

                            {/* ==============================Nombre, Razon Social, Direccion ============================================= */}

                            <div className="flex flex-col sm:flex-row items-center gap-14">

                                <div className="flex flex-col">

                                    <label htmlFor="nombre_proveedor" className="text-gray-200">Nombre Proveedor:</label>
                                    <select
                                        name="nombre_proveedor"
                                        className="w-[228px] px-4 py-2 rounded-lg bg-gray-700 text-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                                    // value={searchParams.user_name}
                                    // onChange={`handleInputChange`}
                                    >
                                        <option value="" placeholder="Selecciona un cliente">Selecciona un Proveedor:</option>
                                        {proveedores.map((proveedor) => (
                                            <option key={proveedor.nombre_proveedor} value={proveedor.nombre_proveedor}>{`${proveedor.nombre_proveedor}`}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="razon_social" className="text-gray-200">Razon Social:</label>
                                    <select
                                        className="w-[150px] px-4 py-2 rounded-lg bg-gray-700 text-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                                        name="razon_social"
                                    >
                                        <option value="" >Escriba razon social</option>
                                        {proveedores.map((proveedor) => (
                                            <option key={proveedor.razon_social} value={proveedor.razon_social}>{`${proveedor.razon_social}`}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="direccion" className="text-gray-200">Direccion:</label>
                                    <select
                                        className="w-[150px] px-4 py-2 rounded-lg bg-gray-700 text-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                                        name="direccion"
                                    >
                                        <option value="direccion" >Escriba Direccion</option>
                                        {proveedores.map((proveedor) => (
                                            <option key={proveedor.direccion} value={proveedor.direccion}>{`${proveedor.direccion}`}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>


                            {/* ==============================Departamento Ciudad ============================================= */}

                            <div className="flex flex-col sm:flex-row items-center gap-14">
                                <div className="flex flex-col">
                                    <label htmlFor="departamento" className="text-gray-200">Código Departamento:</label>
                                    <select
                                        className="w-full px-4 py-2 rounded-lg bg-gray-700 text-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                                        name="departamento"
                                    >
                                        <option value="departamento" >Selecciona un Departamento</option>
                                        {departamentos.map((dep) => (
                                            <option key={dep.id} value={dep.codigo_dane}>{`${dep.nombre_departamento} - ${dep.codigo_dane}`}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="ciudad" className="text-gray-200">Código Ciudad:</label>
                                    <select
                                        className="w-full px-4 py-2 rounded-lg bg-gray-700 text-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                                        name="ciudad"
                                    >
                                        <option value="" >Selecciona una Ciudad</option>
                                        {ciudades.map((ciudad) => (
                                            <option key={ciudad.id} value={ciudad.codigo_dane}>{`${ciudad.nombre_ciudad} - ${ciudad.codigo_dane}`}</option>
                                        ))}
                                    </select>
                                </div>

                            </div>

                            {/* ==============================Telefono, Correo, Nit ============================================= */}

                            <div className="flex flex-col  sm:flex-row items-center gap-14">
                                <div className="flex flex-col">
                                    <label htmlFor="Telefono" className="text-gray-200">Telefono</label>
                                    <select
                                        type="text"
                                        id="telefono"
                                        name="telefono"
                                        placeholder="Razon social"
                                        className="w-full px-4 py-2 rounded-lg bg-gray-700 text-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-300"

                                    >
                                        <option value="">
                                            Escriba Telefono
                                        </option>

                                        {proveedores.map((proveedor) => (
                                            <option value="">
                                                {proveedor.telefono}
                                            </option>
                                        ))}

                                    </select>
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="correo_proveedor" className="text-gray-200">Email</label>
                                    <select
                                        type="correo_proveedor"
                                        id="correo_proveedor"
                                        name="correo_proveedor"
                                        placeholder="correo_proveedor"
                                        className="w-full px-4 py-2 rounded-lg bg-gray-700 text-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                                    >
                                        <option value="">Escriba Email</option>
                                        {proveedores.map((proveedor) => (
                                            <option>{proveedor.correo_proveedor}  </option>
                                        ))}
                                    </select>

                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="nit" className="text-gray-200">Nit</label>
                                    <select
                                        type="nit"
                                        id="nit"
                                        name="nit"
                                        placeholder="nit"
                                        className="w-full px-4 py-2 rounded-lg bg-gray-700 text-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                                    >
                                        <option value="">Escriba Nit</option>
                                        {proveedores.map((proveedor) => (
                                            <option>{proveedor.nit}  </option>
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

export default ProveedoresSearchForm;