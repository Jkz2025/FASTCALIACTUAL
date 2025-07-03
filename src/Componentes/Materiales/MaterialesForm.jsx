import React, { useState } from 'react';
import styles from '../../../src/style';
import { useFetchMateriales } from '../Hooks/useFetchMateriales';
import { useNavigate } from "react-router-dom";
import { useFetchBodegas } from '../Hooks/usefetchbodegas';
import ButtonFastCali from '../ButtonFastCali.jsx/ButtonFastCali';

const MaterialesForm = () => {


    const navigate = useNavigate()
    const [materiales, setMateriales] = useState([])
    const [bodegas, setBodegas] = useState([])
    const [searchParams, setSearchParams] = useState({
        id: '',
        nombre: '',
        categoria: '',
        costo: '',
        precio_venta: ''
    });

    useFetchMateriales(setMateriales)
    useFetchBodegas(setBodegas)

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

    const handleCreateMaterial = () => {

        navigate('/GestionInventarios/CrearMaterial')

    }

    const handleCancelarClick = () => {
        setShowFilterForm(false);
        setShowCancelButton(false);
        setShowCreateButton(true);
        // Limpiar los campos del formulario al cancelar la búsqueda
        setSearchParams({
            id: '',
            nombre: '',
            categoria: '',
            costo: '',
            precio_venta: ''
        });
    };

    // const searchPedidos = async () => {
    //     // Aquí debes implementar la lógica para hacer la solicitud de búsqueda de pedidos
    //     // Utiliza los parámetros de búsqueda guardados en 'searchParams'
    //     // Por ejemplo:
    //     const response = await fetch(`/Pedidos?user_name=${searchParams.user_name}&bodega=${searchParams.bodega}&fechaInicio=${searchParams.fechaInicio}&fechaFin=${searchParams.fechaFin}&codigoPedido=${searchParams.codigoPedido}`);
    //     const data = await fetchPedidos();
    //     setPedidos(data);
    // };

    const handleInputChange = (e) => {
        setSearchParams({
            ...searchParams,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="max-w-4xl mx-auto my-8 mt-10">
            <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-black rounded-lg shadow-lg p-6">
                <div className={`${styles.flexCenter} sm:ml-10 ml-0 sm:mt-0 mt-10`}>
                    {showCreateButton && <ButtonFastCali onClick={handleCreateMaterial}  text={`Crear Material`} />}
                    {showFilterForm ? (
                        <form className="flex flex-wrap gap-2">
                            {/* Input select de material */}
                            <div className="flex flex-col">
                                <label htmlFor="material" className="text-gray-400">Nombre Material:</label>
                                <select name="material" className="px-4 py-2 rounded-lg focus:outline-none focus:ring focus:border-blue-300 bg-white border border-gray-300" value={searchParams.u} onChange={handleInputChange}>
                                    <option value="">Selecciona un material</option>
                                    {materiales.map((material) => (
                                        <option key={material.id} value={material.id}>{`${material.name} - ${material.id}`}</option>
                                    ))}
                                </select>
                            </div>
                            {/* Input select de bodega */}
                            <div className="flex flex-col">
                                <label htmlFor="bodega" className="text-gray-400">Bodega:</label>
                                <select name="bodega" className="px-4 py-2 rounded-lg focus:outline-none focus:ring focus:border-blue-300 bg-white border border-gray-300" value={searchParams.bodega} onChange={handleInputChange}>
                                    <option value="">Selecciona una bodega</option>
                                    {bodegas.map((bodega) => (
                                         <option key={`${bodega.id}-${bodega.name}`} value={bodega.id}>{bodega.id} - {bodega.name}</option>
                                    ))}
                                </select>
                            </div>
                            {/* Inputs de rango de fechas */}
                            <div className="flex flex-col">
                                <label htmlFor="fechaInicio" className="text-gray-400">Fecha inicio:</label>
                                <input type="date" id="fechaInicio" name="fechaInicio" placeholder="Fecha inicio" className="px-4 py-2 rounded-lg focus:outline-none focus:ring focus:border-blue-300 bg-white border border-gray-300" value={searchParams.fechaInicio} onChange={handleInputChange} />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="fechaFin" className="text-gray-400">Fecha fin:</label>
                                <input type="date" id="fechaFin" name="fechaFin" placeholder="Fecha fin" className="px-4 py-2 rounded-lg focus:outline-none focus:ring focus:border-blue-300 bg-white border border-gray-300" value={searchParams.fechaFin} onChange={handleInputChange} />
                            </div>
                            {/* Input de búsqueda por código de producto */}
                            <div className="flex flex-col">
                                <label htmlFor="codigoMaterial" className="text-gray-400">Código de Material:</label>
                                <input type="text" id="codigoMaterial" name="codigoMaterial" placeholder="Buscar código de material" className="px-4 py-2 rounded-lg focus:outline-none focus:ring focus:border-blue-300 bg-white border border-gray-300" value={searchParams.codigoMaterial} onChange={handleInputChange} />
                            </div>
                        </form>
                    ) : null}
                    {/* Botón Buscar Material */}
                    <ButtonFastCali text={`Buscar Material`} onClick={handleBuscarClick} />
                </div>
            </div>
            {showCancelButton ? (
                <div className='justify-center flex py-4'><ButtonFastCali text={`Cancelar`} onClick={handleCancelarClick} /></div>
            ) : null}
        </div>
    );
}

export default MaterialesForm;
