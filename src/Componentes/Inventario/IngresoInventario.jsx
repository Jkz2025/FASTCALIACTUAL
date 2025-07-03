import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ButtonFastCali from '../ButtonFastCali.jsx/ButtonFastCali';
import { useFetchMateriales } from '../Hooks/useFetchMateriales';
import { useFetchBodegas } from '../Hooks/usefetchbodegas';
import { supabase } from '../../CreateClient';

const IngresoInventario = () => {
    const navigate = useNavigate();
    const [bodegainicial, setBodegaInicial] = useState([])
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [numeroEntrada, setNumeroEntrada] = useState('');
    const [allMateriales, setAllMateriales] = useState('')
    const [selectedMaterial, setSelectedMaterial] = useState({
        id: '',
        name: '',
        costo: '',
        cantidad: '',
        valorTotal: '',
    });

    const [desde, setDesde] = useState('');
    const [hacia, setHacia] = useState('');

    const [entrada, setEntrada] = useState({
        numero_entrada: '',
        fecha: '',
        proveedor: '',
        descripcion: '',
        cantidad: '',
        tipo_entrada: '',
        bodega_inicial: '',
        bodega_final: '',
        codigo_materiales: '',
        costo_materiales: '',
        nombre_materiales: '',
        valor_total: '',
        valor_total_costos: '',
    });

    const [materiales, setMateriales] = useState([]);
    const [bodegas, setBodegas] = useState([]);
    const [trasladoInventario, setTrasladoInventario] = useState(false);
    const [productosAgregados, setProductosAgregados] = useState([]);

    useFetchMateriales(setMateriales);
    useFetchBodegas(setBodegas);

    // useEffect(() => {
    //     if (!trasladoInventario && bodegas.length > 0) {
    //         // Set the initial warehouse when it's not a movement of inventory
    //         setEntrada((prevEntrada) => ({
    //             ...prevEntrada,
    //             bodega_inicial: bodegas[0].name // Select the first warehouse
    //         }));
    //     } 

    // }, [trasladoInventario, bodegas]);

    useEffect(() => {
        const fetchLastNumeroEntrada = async () => {
            const { data, error } = await supabase
                .from('entradas_inventario')
                .select('numero_entrada')
                .order('id', { ascending: false })
                .limit(1);

            if (error) {
                console.error('Error fetching last numero_entrada:', error);
            } else {
                const lastNumero = data.length > 0 ? data[0].numero_entrada : 'E0';
                const nextNumero = `E${parseInt(lastNumero.slice(1)) + 1}`;
                setNumeroEntrada(nextNumero);
                setEntrada(prev => ({ ...prev, numero_entrada: nextNumero }));
            }
        };

        fetchLastNumeroEntrada();
    }, []);

    // const handleDesdeChange = (event) => {
    //     setDesde(event.target.value);
    //     if (event.target.value === hacia) {
    //         setHacia(''); // Reset the 'Hacia' selection if it's the same as 'Desde'
    //         alert('No se pueden elegir las mismas bodegas');
    //     }
    // };

    const handleDesdeHacia = (event) => {
        const selectedBodega = event.target.value;
        const selectedBodegaFinal = entrada.bodega_final;
        if (selectedBodega) {
            setEntrada({
                bodega_inicial: selectedBodega
            })
        }

        setEntrada((prevEntrada) => ({
            ...prevEntrada,
            bodega_inicial: selectedBodega
        }));

        if (selectedBodega === selectedBodegaFinal) {
            setEntrada((prevEntrada) => ({
                ...prevEntrada,
                bodega_final: ''
            }));
            alert('No se pueden elegir las mismas bodegas');
        }
    };


    const handleDesdeChange = (event) => {
        const selectedBodega = event.target.value;
        const selectedBodegaInicial = entrada.bodega_inicial;

        setEntrada((prevEntrada) => ({
            ...prevEntrada,
            bodega_final: selectedBodega
        }));

        if (selectedBodega === selectedBodegaInicial) {
            setEntrada((prevEntrada) => ({
                ...prevEntrada,
                bodega_inicial: ''
            }));
            alert('No se pueden elegir las mismas bodegas');
        }
    };


    const handleIdAndName = (e) => {
        const select = e.target.value;
        const selectedMaterial = materiales.find(material => material.name === select || material.id === select);
        if (selectedMaterial) {
            setSelectedMaterial({ ...selectedMaterial });
        }
    };

    const handleChangeProveedor = (e) => {
        const value = e.target.value
        setEntrada({
            ...entrada,
            proveedor: value
        })
    }

    const handleChangeMovimiento = (e) => {
        const value = e.target.value;
        setEntrada({
            ...entrada,
            tipo_entrada: value
        })
        if (value === "Movimiento Inventario") {
            setTrasladoInventario(true);
        } else {
            setTrasladoInventario(false);
        }
    };

    const agregarProducto = () => {
        const Producto = selectedMaterial.name;
        const Cantidad = selectedMaterial.cantidad;
        const Costo = selectedMaterial.costo;

        if (!Producto) {
            alert('Por favor elija un producto');
            return;
        }

        if (!Cantidad || Cantidad <= 0) {
            alert('Por favor escriba una cantidad');
            return;
        }

        const valorTotal = Costo * Cantidad;
        const productoConValorTotal = { ...selectedMaterial, valorTotal };

        setProductosAgregados([...productosAgregados, productoConValorTotal]);
        setSelectedMaterial({
            id: '',
            name: '',
            costo: '',
            cantidad: '',
            valorTotal: '',
        });
    };

    const eliminarProducto = (index) => {
        setProductosAgregados(productosAgregados.filter((_, i) => i !== index));
    };

    const allMaterialesAndCostos = () => {
        if (prod.id) {
            setSelectedObligaciones((prevSelected) => [
                ...prevSelected,
                entrada.codigo_materiales,
            ]); // Agregar el id seleccionada al estado
            if (prod.name) {
                setSelectedObligaciones((prevSelected) => [
                    ...prevSelected,
                    entrada.nombre_materiales,
                ]); // Agregar el id seleccionada al estado
            } if (prod.costo) {
                setSelectedObligaciones((prevSelected) => [
                    ...prevSelected,
                    entrada.costo_materiales,
                ]); // Agregar el id seleccionada al estado
            } if (prod.cantidad) {
                setSelectedObligaciones((prevSelected) => [
                    ...prevSelected,
                    entrada.cantidad,
                ]); // Agregar el id seleccionada al estado
            } if (prod.valorTotal) {
                setSelectedObligaciones((prevSelected) => [
                    ...prevSelected,
                    entrada.valor_total_costos,
                ]); // Agregar el id seleccionada al estado
            }

        }
    }
    const sumaTotal = productosAgregados.reduce((acc, prod) => acc + prod.valorTotal, 0);

    async function createEntrada(e) {
        e.preventDefault();
        if (isSubmitting) return;
        setIsSubmitting(true);
        
        const { error } = await supabase.from("entradas_inventario").insert([
            {
                ...entrada,
                fecha: new Date().toISOString().split('T')[0],
                valor_total: sumaTotal,
                bodega_inicial: bodegainicial,
                valor_total_costos: productosAgregados.map(p => p.valorTotal).join(','),
                codigo_materiales: productosAgregados.map(p => p.id).join(','),
                costo_materiales: productosAgregados.map(p => p.costo).join(','),
                nombre_materiales: productosAgregados.map(p => p.name).join(','),
                cantidad: productosAgregados.map(p => p.cantidad).reduce((a, b) => a + b, 0),
            },
        ]);


        const productosParaInsertar = productosAgregados.map(producto => ({
            codigo_material: producto.id,
            nombre_bodega: bodegainicial,
            nombre_material: producto.name,
            costo: producto.costo,
            cantidad: producto.cantidad,
            fecha: new Date().toISOString().split('T')[0],
        }));
        const { errorDos } = await supabase.from("almacen_bodega").insert(productosParaInsertar);

        if (error) {
            console.error("Error creating entry:", error.message);
            setIsSubmitting(false);
            alert("Error creating entry: " + error.message);
        } else if (errorDos) {
            console.error("Error creating entry:", error.message);
            setIsSubmitting(false);
            alert("Error creating entry: " + error.message);
        } else {
            alert('Se inserta el registro satisfactoriamente');
            setIsSubmitting(false);
            navigate('/GestionInventarios/Inventario');
        }
    }

    return (
        <>
            <div className="max-w-4xl mx-auto my-8 mt-40">
                <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-black rounded-lg shadow-lg p-6">
                    <h1 className="text-2xl font-bold text-white mb-4">Movimientos de Inventario</h1>

                    <div className='flex flex-col gap-4'>
                        <div className='flex items-center gap-2'>
                            <select className='p-2 rounded-lg bg-gray-800 text-white' onChange={handleChangeMovimiento} value={entrada.tipo_entrada} name="" id="">
                                <option value="" disabled selected>
                                    Seleccione un tipo Movimiento
                                </option>
                                <option value="Ingreso Inventario">Ingreso de inventario</option>
                                <option value="Salida Inventario">Salida Inventario</option>
                                <option value="Movimiento Inventario">Movimiento Inventario</option>
                            </select>
                            <select className='p-2 rounded-lg bg-gray-800 text-white' value={entrada.proveedor}
                                onChange={handleChangeProveedor}
                                name="" id="">
                                <option value="" disabled selected>Seleccione un proveedor</option>
                                <option >FastCali</option>
                            </select>
                        </div>

                        {trasladoInventario ? (
                            <div className='flex flex-col gap-4'>
                                <div className='flex items-center gap-2 text-white'>
                                    <label htmlFor="">Desde</label>
                                    <select
                                        value={entrada.bodega_inicial}
                                        onChange={handleDesdeHacia}
                                        className='p-2 rounded-lg bg-gray-800 text-gray-500'
                                    >
                                        <option value="" disabled selected>
                                            Seleccione un tipo Movimiento
                                        </option>
                                        {bodegas.map((bodega) => (
                                            <option key={bodega.id} value={bodega.name}>{bodega.name}</option>
                                        ))}
                                    </select>
                                    <label htmlFor="">Hacia</label>
                                    <select
                                        value={entrada.bodega_final}
                                        onChange={handleDesdeChange}
                                        className='p-2 rounded-lg bg-gray-800 text-gray-500'
                                    >
                                        <option value=''>Seleccione una bodega</option>
                                        {bodegas
                                            .filter((bodega) => bodega.name !== entrada.bodega_inicial)
                                            .map((bodega) => (
                                                <option key={bodega.id} value={bodega.name}>{bodega.name}</option>
                                            ))}
                                    </select>
                                </div>
                            </div>
                        ) : (
                            <div className='flex flex-col gap-4'>
                                <div className='flex items-center gap-2 text-white'>
                                    <label htmlFor="">Bodega: </label>

                                    <select className='p-2 rounded-lg bg-gray-800 text-gray-500' value={bodegainicial} onChange={(e) => setBodegaInicial(e.target.value)}>
                                        <option value="">Seleccione una bodega</option>
                                        {bodegas.map((bodega) => (
                                            <option key={bodega.id} value={bodega.name}>{bodega.name}</option>
                                        ))}
                                    </select>

                                </div>
                            </div>
                        )}

                    </div>
                    <div className='flex items-center gap-2'>
                        <label htmlFor="" className='text-white py-4'>Descripción
                            <input type="description" className='p-2 rounded-lg bg-gray-800 text-gray-500 w-[600px] h-[100px]'
                                onChange={(e) => setEntrada({ ...entrada, descripcion: e.target.value })} />

                        </label>
                    </div>
                    <table className="w-[750px] table-auto bg-gray-900 rounded-lg text-white">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 text-center bg-gray-800">Nombre</th>
                                <th className="px-4 py-2 bg-gray-800">Costo</th>
                                <th className="px-4 py-2 text-center bg-gray-800">Cantidad</th>
                            </tr>
                        </thead>
                    </table>

                    <div className='w-full flex justify-center mt-2 py-5 gap-4'>
                        <select
                            className='p-2 rounded-lg bg-gray-800 text-white'
                            value={selectedMaterial.name}
                            onChange={handleIdAndName}
                        >
                            <option value="" disabled selected>Seleccione un material</option>
                            {materiales.map(material => (
                                <option key={material.name} value={material.name}>{material.name}</option>
                            ))}
                        </select>

                        <input
                            name="costo"
                            className="p-2 rounded-lg bg-gray-800 text-white w-[165px] mx-1"
                            type="number"
                            step={`1`}
                            min={`0`}
                            placeholder="Costo"
                            value={selectedMaterial.costo}
                            onChange={(e) => setSelectedMaterial({ ...selectedMaterial, costo: e.target.value })}
                        />
                        <input
                            name="cantidad"
                            className="p-2 rounded-lg bg-gray-800 text-white w-[165px] mx-1"
                            type="number"
                            step={`1`}
                            min={`0`}
                            placeholder="Cantidad"
                            value={selectedMaterial.cantidad}
                            onChange={(e) => setSelectedMaterial({ ...selectedMaterial, cantidad: e.target.value })}
                        />
                    </div>

                    <div className='flex justify-center mt-4'>
                        <button
                            onClick={agregarProducto}
                            className='p-2 rounded-lg bg-blue-600 text-white w-[200px]'
                        >
                            Agregar Producto
                        </button>
                    </div>

                    <table className="w-full table-auto bg-gray-900 rounded-lg text-white mt-4">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 text-center bg-gray-800">Id</th>
                                <th className="px-4 py-2 text-center bg-gray-800">Nombre</th>
                                <th className="px-4 py-2 bg-gray-800">Costo</th>
                                <th className="px-4 py-2 text-center bg-gray-800">Cantidad</th>
                                <th className="px-4 py-2 bg-gray-800">Valor Total</th>
                            </tr>
                        </thead>
                        <tbody >
                            {productosAgregados.map((prod, index) => (
                                <tr key={index}>
                                    <td className="border px-4 py-2 text-center">{prod.id}</td>
                                    <td className="border px-4 py-2 text-center">{prod.name}</td>
                                    <td className="border px-4 py-2">{prod.costo}</td>
                                    <td className="border px-4 py-2 text-center">{prod.cantidad}</td>
                                    <td className="border px-4 py-2">{prod.valorTotal}</td>
                                    <button className='mt-2' onClick={() => eliminarProducto(index)}>❌</button>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <form className="flex flex-col gap-4 mt-4" onSubmit={createEntrada}>
                        <p className="text-white">Número de Entrada: {numeroEntrada}</p>
                        <p className="text-white">Valor Total Ingreso: ${sumaTotal.toLocaleString()}</p>
                        <p className="text-white">Fecha de Creación: {new Date().toLocaleString()} </p>
                        <div className='flex justify-center'>
                            <ButtonFastCali text='Realizar Movimiento' />
                        </div>
                    </form>
                </div>
                <Link to='/GestionInventarios/Inventario'>
                    <div className='py-4 flex justify-center'>
                        <ButtonFastCali text='🔙' />
                    </div>
                </Link>
            </div>
        </>
    );
};

export default IngresoInventario;
