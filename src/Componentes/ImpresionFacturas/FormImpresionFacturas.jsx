import React from 'react'
import ButtonFastCali from '../ButtonFastCali.jsx/ButtonFastCali'
import { useState } from 'react';
import styles from '../../style';
import { useFetchPedidos } from '../Hooks/useFetchPedidos';
import { useFetchBodegas } from '../Hooks/useFetchBodegas';
import { useNavigate } from 'react-router-dom';
import { useFetchFacturas } from '../Hooks/useFetchFacturas';

const FormImpresionFacturas = ({onSearch}) => {

    const [showSearchForm, setShowSearchForm] = useState(false);
    const [showFilterForm, setShowFilterForm] = useState(false);
    const [showCancelButton, setShowCancelButton] = useState(false);
    const navigate = useNavigate()
    const [pedidos, setPedidos] = useState([])
    const [facturas, setFacturas] = useState([])
    const [bodegas, setBodegas] = useState([])
    const [searchParams, setSearchParams] = useState({
        user_name: '',
        bodega: '',
        fechaInicio: '',
        fechaFin: '',
        codigoDocumento: ''
    });
    const [documentType, setDocumentType] = useState("factura"); // "Factura" , "pedido", "nota_credito", "note_debito"

    useFetchPedidos(setPedidos)
    useFetchBodegas(setBodegas)
    useFetchFacturas(setFacturas)

    const handleSearchClick = () => {
        setShowFilterForm(true)
        setShowCancelButton(true)
    }

    const handleCancelarClick = () => {
        setShowFilterForm(false)
        setShowCancelButton(false)
        setSearchParams({
            cliente: "",
            bodega: "",
            fechaInicio: "",
            fechaFin: "",
            codigoDocumento: ""
        })
    }

    const handleInputChange = (e) => {
        setSearchParams({
            ...searchParams,
            [e.target.name]: e.target.value
        });
    };

    const handleDocumentTypeChange = (e) => {
        setDocumentType(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSearch) {
            onSearch({ ...searchParams, documentType })
        }
    }


    return (
        <div className='max-w-6xl mx-auto my-8 mt-10'>
            <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-black rounded-lg shadow-lg p-6">
                <div className={`${styles.flexCenter} sm:ml-10 ml-0 sm:mt-0 mt-10`}>
                    {!showFilterForm ? (
                        <ButtonFastCali text={`Buscar Documento`} onClick={handleSearchClick} />
                    ) : (
                        <form onSubmit={handleSubmit} className="w-full">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Selección de tipo de documento */}
                                <div className="flex flex-col">
                                    <label htmlFor="documentType" className="text-gray-400">Tipo de Documento:</label>
                                    <select
                                        name="documentType"
                                        className="p-2 rounded-lg bg-gray-800 text-white"
                                        value={documentType}
                                        onChange={handleDocumentTypeChange}
                                    >
                                        <option value="factura">Factura</option>
                                        <option value="pedido">Pedido</option>
                                        <option value="nota_credito">Nota Crédito</option>
                                        <option value="nota_debito">Nota Débito</option>
                                    </select>
                                </div>

                                {/* Campos comunes a todos los tipos de documento */}
                                <div className="flex flex-col">
                                    <label htmlFor="codigoDocumento" className="text-gray-400">Código:</label>
                                    <input
                                        type="text"
                                        name="codigoDocumento"
                                        placeholder="Buscar por código"
                                        className="p-2 rounded-lg bg-gray-800 text-white"
                                        value={searchParams.codigoDocumento}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                {/* Campos específicos para facturas */}
                                {documentType === 'factura' && (
                                    <>
                                        <div className="flex flex-col">
                                            <label htmlFor="cliente" className="text-gray-400">Cliente:</label>
                                            <input
                                                type="text"
                                                name="cliente"
                                                placeholder="Buscar cliente"
                                                className="p-2 rounded-lg bg-gray-800 text-white"
                                                value={searchParams.cliente}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label htmlFor="bodega" className="text-gray-400">Bodega:</label>
                                            <input
                                                type="text"
                                                name="bodega"
                                                placeholder="Buscar bodega"
                                                className="p-2 rounded-lg bg-gray-800 text-white"
                                                value={searchParams.bodega}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </>
                                )}

                                {/* Campos específicos para pedidos */}
                                {documentType === 'pedido' && (
                                    <>
                                        {/* Agregar campos específicos para pedidos aquí */}
                                    </>
                                )}

                                {/* Rango de fechas común a todos */}
                                <div className="flex flex-col">
                                    <label htmlFor="fechaInicio" className="text-gray-400">Fecha inicio:</label>
                                    <input
                                        type="date"
                                        name="fechaInicio"
                                        className="p-2 rounded-lg bg-gray-800 text-white"
                                        value={searchParams.fechaInicio}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="fechaFin" className="text-gray-400">Fecha fin:</label>
                                    <input
                                        type="date"
                                        name="fechaFin"
                                        className="p-2 rounded-lg bg-gray-800 text-white"
                                        value={searchParams.fechaFin}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                            <div className="flex justify-center mt-4 space-x-4">
                                <ButtonFastCali type="submit" text="Buscar" />
                                <ButtonFastCali type="button" text="Cancelar" onClick={handleCancelarClick} />
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FormImpresionFacturas;