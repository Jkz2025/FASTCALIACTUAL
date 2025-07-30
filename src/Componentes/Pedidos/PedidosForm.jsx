import React, { useState, useEffect } from 'react';
import styles from '../../../src/style';
import Button from '../Dashboard/Components/Button';
import { useFetchPedidos } from '../Hooks/useFetchPedidos';
import { useFetchBodegas } from '../Hooks/useFetchBodegas';
import { useNavigate } from "react-router-dom";
import ButtonFastCali from '../ButtonFastCali.jsx/ButtonFastCali';
import Loading from '../Loading/Loading';

const PedidosForm = () => {

    const navigate = useNavigate()
    const [pedidos, setPedidos] = useState([])
    const [empleados, setEmpleados] = useState([])
    const [bodegas, setBodegas] = useState([])
    const [searchParams, setSearchParams] = useState({
        user_name: '',
        bodega: '',
        fechaInicio: '',
        fechaFin: '',
        codigoPedido: ''
    });

    useFetchPedidos(setPedidos)
    useFetchBodegas(setBodegas)

    const [showFilterForm, setShowFilterForm] = useState(false);
    const [showCancelButton, setShowCancelButton] = useState(false);
    const [showCreateButton, setShowCreateButton] = useState(true);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (pedidos.length > 0) {
            setIsLoading(false)
        }

    }, [pedidos])



    const handleBuscarClick = () => {
        setShowFilterForm(true);
        setShowCancelButton(true);
        setShowCreateButton(false);
        // Lógica para buscar pedidos con los parámetros de búsqueda
        // searchPedidos();
    };

    const handleCreatePedido = () => {

        navigate('/FacturacionyPedidos/CrearPedido')

    }

    const handleCancelarClick = () => {
        setShowFilterForm(false);
        setShowCancelButton(false);
        setShowCreateButton(true);
        // Limpiar los campos del formulario al cancelar la búsqueda
        setSearchParams({
            user_name: '',
            bodega: '',
            fechaInicio: '',
            fechaFin: '',
            codigoPedido: ''
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

    if (isLoading) {
        return <Loading />
    }

    return (
        <div className="max-w-4xl mx-auto my-8 mt-10">
            <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-black rounded-lg shadow-lg p-6">
                <div className={`${styles.flexCenter} sm:ml-10 ml-0 sm:mt-0 mt-10`}>
                    {showCreateButton && <ButtonFastCali onClick={handleCreatePedido} text={`Crear Pedido`} />}
                    {showFilterForm ? (
                        <form className="flex flex-wrap gap-2">
                            {/* Input select de cliente */}
                            <div className="flex flex-col">
                                <label htmlFor="cliente" className="text-gray-400">Cliente:</label>
                                <select name="cliente" className="p-2 rounded-lg bg-gray-800 text-white" value={searchParams.u} onChange={handleInputChange}>
                                    <option value="Selecciona un cliente" className='text-gray-500' disabled selected>Selecciona un cliente</option>
                                    {pedidos.map((pedido) => (
                                        <option key={pedido.id} value={pedido.user_id}>{`${pedido.user_id} - ${pedido.user_name}`}</option>
                                    ))}
                                </select>
                            </div>
                            {/* Input select de bodega */}
                            <div className="flex flex-col">
                                <label htmlFor="bodega" className="text-gray-400">Bodega:</label>
                                <select name="bodega" className="p-2 rounded-lg bg-gray-800 text-white" value={searchParams.bodega} onChange={handleInputChange}>
                                    <option value="" className='text-gray-500 ' disabled selected>Selecciona una bodega</option>
                                    {bodegas.map((bod) => (
                                        <option key={bod.id} value={bod.id}>{bod.id} - {bod.name} </option>
                                    ))}
                                </select>
                            </div>
                            {/* Inputs de rango de fechas */}
                            <div className="flex flex-col">
                                <label htmlFor="fechaInicio" className="text-gray-400">Fecha inicio:</label>
                                <input type="date" id="fechaInicio" name="fechaInicio" placeholder="Fecha inicio" className="p-2 rounded-lg bg-gray-800 text-white" value={searchParams.fechaInicio} onChange={handleInputChange} />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="fechaFin" className="text-gray-400">Fecha fin:</label>
                                <input type="date" id="fechaFin" name="fechaFin" placeholder="Fecha fin" className="p-2 rounded-lg bg-gray-800 text-white" value={searchParams.fechaFin} onChange={handleInputChange} />
                            </div>
                            {/* Input de búsqueda por código de producto */}
                            <div className="flex flex-col">
                                <label htmlFor="codigoPedido" className="text-gray-400">Código de Pedido:</label>
                                <input type="text" id="codigoPedido" name="codigoPedido" placeholder="Buscar código de pedido" className="p-2 rounded-lg bg-gray-800 text-white" value={searchParams.codigoPedido} onChange={handleInputChange} />
                            </div>
                        </form>
                    ) : null}
                    {/* Botón Buscar Pedido */}
                    <ButtonFastCali text={`Buscar Pedido`} onClick={handleBuscarClick} />
                </div>
            </div>
            {showCancelButton ? (
                <div className='justify-center flex py-4'><ButtonFastCali text={`Cancelar`} onClick={handleCancelarClick} /></div>
            ) : null}
        </div>

    );
}

export default PedidosForm;
