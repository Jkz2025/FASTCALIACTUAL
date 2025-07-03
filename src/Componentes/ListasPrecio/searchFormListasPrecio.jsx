import React, { useState } from 'react';
import styles from '../../../src/style';
import Button from '../Dashboard/Components/Button';
import { useFetchBodegas } from '../Hooks/useFetchBodegas';
import { useNavigate } from "react-router-dom";
import ButtonFastCali from '../ButtonFastCali.jsx/ButtonFastCali';
import { useFetchListasPrecio } from '../Hooks/useFetchListasPrecio';

const  SearchFormListasPrecio = () => {


    const navigate = useNavigate()
    const [listasPrecio, setListasPrecio] = useState([])
    // const [searchParams, setSearchParams] = useState({
    //     id: '',
    //     name: '',
    //     fechaInicio: '',
    //     fechaFin: '',
    //     codigoBodega: ''
    // });

useFetchListasPrecio(setListasPrecio)

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

    const handleCreateBodega = () => {

        navigate('/GestionInventarios/CreateListasPrecio')

    }

    const handleCancelarClick = () => {
        setShowFilterForm(false);
        setShowCancelButton(false);
        setShowCreateButton(true);
        // Limpiar los campos del formulario al cancelar la búsqueda
        // setSearchParams({
        //     user_name: '',
        //     bodega: '',
        //     fechaInicio: '',
        //     fechaFin: '',
        //     codigoPedido: ''
        // });
    };

   
    return (
        <div className="max-w-4xl mx-auto my-8 mt-10">
            <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-black rounded-lg shadow-lg p-6">
                <div className={`${styles.flexCenter} sm:ml-10 ml-0 sm:mt-0 mt-10`}>
                    {showCreateButton && <ButtonFastCali onClick={handleCreateBodega}  text={`Crear Lista`} />}
                    {showFilterForm ? (
                        <form className="flex flex-wrap gap-2">
                               {/* Input de búsqueda por código de Lista */}
                               <div className="flex flex-col">
                                <label htmlFor="codigoPedido" className="text-gray-400">Código de Lista:</label>
                                <input type="text" id="codigoPedido" name="codigoPedido" placeholder="Buscar código de Lista" className="px-4 py-2 rounded-lg focus:outline-none focus:ring focus:border-blue-300 bg-white border border-gray-300" value={``} onChange={`handleInputChange`} />
                            </div>
                            {/* Input select de lista */}
                            <div className="flex flex-col">
                                <label htmlFor="bodega" className="text-gray-400">Lista:</label>
                                <select name="bodega" className="px-4 py-2 rounded-lg focus:outline-none focus:ring focus:border-blue-300 bg-white border border-gray-300" value={`searchParams`.bodega} onChange={`handleInputChange`}>
                                    <option value="">Selecciona una lista</option>
                                    {listasPrecio.map((lista) => (
                                        <option key={lista.id} value={lista.id}>{lista.id} - {lista .name} </option>
                                    ))}
                                </select>
                            </div>
                        </form>
                    ) : null}
                    {/* Botón Buscar Pedido */}
                    <ButtonFastCali text={`Buscar Lista`} onClick={handleBuscarClick} />
                </div>
            </div>
            {showCancelButton ? (
                <div className='justify-center flex py-4'><ButtonFastCali text={`Cancelar`} onClick={handleCancelarClick} /></div>
            ) : null}
        </div>
    );
}

export default SearchFormListasPrecio;
