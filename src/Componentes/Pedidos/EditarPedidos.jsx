import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFetchPedidos } from '../Hooks/useFetchPedidos';
import ButtonFastCali from '../ButtonFastCali.jsx/ButtonFastCali';
import { useFetchHistorialP } from '../Hooks/useFetchHistorialP';
import { useRef } from 'react';
import { useFetchMateriales } from '../Hooks/useFetchMateriales';
import { useFetchListasPrecioMateriales } from '../Hooks/useFetchListasPrecioMateriales';

const EditPedido = () => {
    const [pedidos, setPedidos] = useState([]);

    const { id } = useParams(); // Obtener el id del pedido de la URL
    const [materialesAgregados, setMaterialesAgregados] = useState([]); // Lista de materiales agregados
    const [descuentoTotal, setDescuentoTotal] = useState(null)
    const [historialPedido, setHistorialPedido] = useState([]);
    const [materialesPedido, setMaterialesPedido] = useState([]);
  const [listasParaMaterial, setListasParaMaterial] = useState([]);
    const [materiales, setMateriales] = useState([])
    const [uniqueMaterials, setUniqueMaterials] = useState([]);
    const [unicoMaterial, setUnicoMaterial] = useState([]);
    const [listasPrecioMateriales, setListasPreciosMateriales] = useState([])

    const [lista_precio_material, setLista_Precio_Material] = useState({
        material_id: "",
        material_name: "",
        precio_venta: '',
        descuento: "",
        descuento_porcentaje: "",
        lista_precios: "",
        cantidad: ""
    })
    // Imprimir el id para depuración
    console.log('ID del pedido:', id);

    useFetchPedidos(setPedidos);
    useFetchHistorialP(setHistorialPedido)
    useFetchMateriales(setMateriales)
    useFetchListasPrecioMateriales(setListasPreciosMateriales)
    const [pedido, setPedido] = useState({
        bodega: '',
        empleado: '',
        empleado_id: '',
        user_name: '',
        user_id: '',
        fecha_creacion: new Date(),
        // Otros campos del pedido que necesites inicializar
    });

    const eliminarMaterial = (e, index) => {
        e.preventDefault();
        setMaterialesAgregados(prev => prev.filter((_, i) => i !== index))
    }

    // Referencia para el botón de eliminar indispensable para eliminarse despues de que se crea un pedido
    const clickEliminarButton = useRef();

    {/*================================================= FUNCION QUE SETEA PRECIO LISTA / PRECIO_VENTA / DESCUENTO AL ELEGIR LISTA================================================= */ }
    const handleChangeLista = (e) => {
        const { name, value } = e.target;

        // Actualizar el estado de lista_precio_material con el nombre de la lista seleccionada
        setLista_Precio_Material((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));

        const listaSelected = listasParaMaterial.find(l => l.lista_precios === value)
        if (listaSelected) {
            setLista_Precio_Material({ ...listaSelected })
        }

    }

    {/*================================================= FUNCION QUE SINCRONIZA ID Y NOMBRE ================================================= */ }
    const handleIdAndName = (e) => {
        const select = e.target.value;
        const selectedMaterial = listasPrecioMateriales.find(lista => lista.material_id === select || lista.material_name === select); // Selecciona y setea el codigo y el nombre de el material
        if (selectedMaterial) {
            setLista_Precio_Material({ ...selectedMaterial });
        }

        // Filtrar listas de precios para el material seleccionado
        const listasParaMaterial = listasPrecioMateriales.filter((lista) => lista.material_id === selectedMaterial.material_id); //Va a buscar el material_id que concuerde con el id seleccionado, luego va a setear el valor de listasParaMaterial y a esa constante la sacamos las listas
        setListasParaMaterial(listasParaMaterial);

    };

    {/*================================================= UseEffect Trae Pedido Seleccionado a Editar ================================================= */ }

    useEffect(() => {
        console.log('Pedidos cargados:', pedidos);
        console.log('Historial Cargados:', historialPedido);

        if (pedidos.length > 0) {
            const pedidoSelected = pedidos.find(p => p.codigo_pedido === parseInt(id, 10)); // Asegurarse de que id es un número
            console.log('Pedido seleccionado:', pedidoSelected);
            if (pedidoSelected) {
                const fecha = new Date(pedidoSelected.fecha_creacion); // Convertir a objeto Date
                const formattedDate = fecha.toLocaleDateString('es-ES', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                });

                setPedido(prevState => ({
                    ...prevState,
                    ...pedidoSelected,
                    bodega: pedidoSelected.bodega_name || '',
                    fecha_creacion: formattedDate
                }));

            } else {
                console.log('No se encontró el pedido con id:', id);
            }
        }

    }, [id, pedidos]);

    {/*================================================= UseEffect Trae los items del pedido ================================================= */ }

    useEffect(() => {
        if (historialPedido.length > 0) {
            const historialSelected = historialPedido.filter(p => p.codigo_pedido === parseInt(id, 10));
            console.log('Historial seleccionado:', historialSelected); // Para depuración

            if (historialSelected.length > 0) {
                setMaterialesPedido(historialSelected);
            } else {
                setMaterialesPedido([]); // Limpia el estado si no se encuentra ningún historial
            }
        }
    }, [id, historialPedido]);
    {/*================================================= UseEffect Trae Material Unico con varias LIstas ================================================= */ }

    useEffect(() => {
        // Función para obtener materiales únicos
        const uniqueMaterials = listasPrecioMateriales.filter((lista, index, self) =>
            index === self.findIndex((m) => (
                m.material_id === lista.material_id
            ))
        );
        setUniqueMaterials(uniqueMaterials);
    }, [materiales]);

    useEffect(() => {
        // Función para obtener materiales únicos
        const unicoMaterial = materialesAgregados.filter((material, index, self) =>
            index === self.findIndex((m) => (
                m.material_id === material.material_id
            ))
        );
        setUnicoMaterial(unicoMaterial);
    }, [materiales]);

    {/*================================================= UseEffect combina los materiales del pedido con agregados ================================================= */ }

    useEffect(() => {
        // Agregar materialesPedido a materialesAgregados
        setMaterialesAgregados(prevMateriales => [...prevMateriales, ...materialesPedido]);
    }, [materialesPedido]);


    {/*================================================= Funcion Actualizar Pedido ================================================= */ }

    const actualizarPedido = async () => {
        const { error } = await supabase
            .from('pedidos')
            .update({ productos })
            .eq('codigo_pedido', id);
        if (error) {
            console.error('Error actualizando pedido:', error);
        } else {
            console.log('Pedido actualizado exitosamente');
        }
    };

    {/*================================================= Funcion Agregar Materiales ================================================= */ }

    const agregarProducto = (e) => {
        e.preventDefault()
        const MaterialId = lista_precio_material.material_id;
        const MaterialName = lista_precio_material.material_name;
        const PrecioVenta = lista_precio_material.precio_venta;
        const Cantidad = lista_precio_material.cantidad;
        const Descuento = lista_precio_material.descuento * Cantidad;
        const subTotalProducto = PrecioVenta * Cantidad
        const valorTotalProducto = subTotalProducto - Descuento
        const descuentoTotal = Descuento
        const productoConValorTotal = { ...lista_precio_material, valorTotalProducto, descuentoTotal };
        const ProdYaExiste = materialesAgregados.some(m => m.material_id === MaterialId)
    
        if (!MaterialId && !MaterialName) {
          alert('Por favor elija un material');
          return;
        } else if (!Cantidad || Cantidad <= 0) {
          alert('Por favor escriba una cantidad');
          return;
        } else if (ProdYaExiste) {
          alert('El producto ya fue agregado ')
          setLista_Precio_Material({
            material_id: "",
            material_name: "",
            precio_venta: '',
            descuento: "",
            descuento_porcentaje: "",
            lista_precios: "",
            cantidad: ""
          });
          return;
        } else {
          if (Descuento) {
            setDescuentoTotal(true)
            setMaterialesAgregados([...materialesAgregados, productoConValorTotal]);
            setLista_Precio_Material({
              material_id: "",
              material_name: "",
              precio_venta: '',
              descuento: "",
              descuento_porcentaje: "",
              lista_precios: "",
              cantidad: ""
            });
          } else {
            setMaterialesAgregados([...materialesAgregados, productoConValorTotal]);
            setLista_Precio_Material({
              material_id: "",
              material_name: "",
              precio_venta: '',
              descuento: "",
              descuento_porcentaje: "",
              lista_precios: "",
              cantidad: ""
            });
          }
        }
    
    
      };

    return (
        <div className="max-w-4xl mx-auto my-8 mt-40">
            <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-black rounded-lg shadow-lg p-6">
                <h1 className="text-2xl font-bold text-white mb-4">Editar Pedido</h1>
                <form className="flex flex-col gap-4">
                    <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-black rounded-lg shadow-lg p-6">
                        <div className="flex items-center gap-2">
                            <input
                                name="bodega_id"
                                className="p-2 rounded-lg bg-gray-800 text-white w-4xl"
                                type="text"
                                value={pedido.bodega}
                                readOnly
                            />
                            <input
                                name="bodega_id"
                                className="p-2 rounded-lg bg-gray-800 text-white w-4xl"
                                type="text"
                                value={`${pedido.empleado} - ${pedido.empleado_id}`} // Concatenar los valores con un espacio en medio
                                readOnly
                            />
                            <input
                                name="bodega_id"
                                className="p-2 rounded-lg bg-gray-800 text-white w-4xl"
                                type="text"
                                value={`${pedido.user_name} - ${pedido.user_id}`} // Concatenar los valores con un espacio en medio
                                readOnly
                            />

                            <img className='h-[40px] cursor-pointer' alt="" />

                            <img className='h-[40px] cursor-pointer' alt="" />
                        </div>
                        <div className="max-w-4xl mx-auto my-8">
                            <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-black rounded-lg shadow-lg p-3">
                                <table className="w-full table-auto bg-gray-900 rounded-lg text-white">
                                    <thead>
                                        <tr>
                                            <th className="px-4 py-2 text-center bg-gray-800 w-16 mx-1">id</th>
                                            <th className="px-4 py-2 text-center bg-gray-800 mx-1">Material</th>
                                            <th className="px-4 py-2 bg-gray-800 mx-1">Lista</th>
                                            <th className="px-4 py-2 bg-gray-800 mx-1">Precio</th>
                                            <th className="px-4 py-2 text-center bg-gray-800 mx-1">Cantidad</th>
                                            <th className="px-4 py-2 text-center bg-gray-800 mx-1">Descuento</th>
                                        </tr>
                                    </thead>
                                </table>
                                {/*================================================= SELECTS PRODUCTOS PARA AGREGAR   ================================================= */}
                                <div className='w-full flex justify-center py-1 gap-4 mt-4'>
                                    {/* Material Id */}
                                    <select
                                        className='p-2 w-20 rounded-lg bg-gray-800 text-white'
                                        value={lista_precio_material.material_id}
                                        onChange={handleIdAndName}
                                    >
                                        <option value="" disabled selected>Escribe un Codigo</option>
                                        {uniqueMaterials.map(m => (
                                            <option value={m.material_id} key={m.material_id} >{m.material_id} </option>
                                        ))}

                                    </select>
                                    {/* Material Name */}
                                    <select
                                        value={lista_precio_material.material_name}
                                        onChange={handleIdAndName}
                                        className='p-2 rounded-lg bg-gray-800 text-white w-[120px]'
                                    >
                                        <option value="" disabled selected>Escribe un material</option>
                                        {uniqueMaterials.map(m => (
                                            <option value={m.material_name} key={m.material_name} >{m.material_name} </option>
                                        ))}
                                    </select>
                                    {/* Lista  */}
                                    <select
                                        name="lista_precios"
                                        onChange={handleChangeLista}
                                        className="p-2 rounded-lg bg-gray-800 text-white"
                                        value={lista_precio_material.lista_precios}
                                    >
                                        <option value="" disabled selected>Seleccione una Lista</option>
                                        {listasParaMaterial.map(l => (
                                            <option value={l.lista_precios}>{l.lista_precios} - %{l.descuento_porcentaje}</option>
                                        ))}
                                    </select>
                                    {/* Precio Venta  */}
                                    <input
                                        name="precio_venta"
                                        className="p-2 rounded-lg bg-gray-800 text-white w-32"
                                        type="number"
                                        value={lista_precio_material.precio_venta}
                                        onChange={handleChangeLista}
                                        step={`1`}
                                        min={`0`}
                                        placeholder="Precio"
                                        readOnly
                                    />
                                    {/* Cantidad  */}
                                    <input
                                        name="cantidad"
                                        className="p-2 w-32 rounded-lg bg-gray-800 text-white"
                                        type="number"
                                        step="1"
                                        min="0"
                                        placeholder="Cantidad"
                                        value={lista_precio_material.cantidad}
                                        onChange={(e) => setLista_Precio_Material({ ...lista_precio_material, cantidad: e.target.value })}
                                    />
                                    <input
                                        name="descuento"
                                        className="p-2 w-32 rounded-lg bg-gray-800 text-white"
                                        type="number"
                                        step="1"
                                        min="0"
                                        placeholder="Descuento"
                                        value={lista_precio_material.descuento}
                                        readOnly
                                    />
                                </div>
                                <div className='flex justify-center mt-4'>
                                    <button
                onClick={agregarProducto}
                                        className='p-2 rounded-lg bg-blue-600 text-white w-[200px]'
                                    >
                                        Agregar Material
                                    </button>
                                </div>
                                {/*================================================= TABLA DE PRODUCTOS AGREGADOS ================================================= */}
                                <table className="w-full table-auto bg-gray-900 rounded-lg text-white mt-4">
                                    <thead>
                                        <tr>
                                            <th className="px-4 py-2 text-center bg-gray-800">Codigo</th>
                                            <th className="px-4 py-2 text-center bg-gray-800">Material</th>
                                            <th className="px-4 py-2 bg-gray-800">Precio</th>
                                            <th className="px-4 py-2 text-center bg-gray-800">Cantidad</th>
                                            <th className="px-4 py-2 text-center bg-gray-800">Lista</th>
                                            <th className="px-4 py-2 text-center bg-gray-800">%</th>
                                            <th className="px-4 py-2 text-center bg-gray-800">Descuento</th>
                                            <th className="px-4 py-2 bg-gray-800">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody >
                                        <>
                                            {materialesAgregados.map((prod, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2 text-center">{prod.material_id}</td>
                  <td className="border px-4 py-2 text-center">{prod.material_name}</td>
                  <td className="border px-4 py-2">{prod.precio_venta}</td>
                  <td className="border px-4 py-2 text-center">{prod.cantidad}</td>
                  <td className="border px-4 py-2 text-center">{prod.lista_precios}</td>
                  <td className="border px-4 py-2 text-center">{prod.descuento_porcentaje}</td>
                  <td className="border px-4 py-2 text-center">{prod.descuento}</td>
                  <td className="border px-4 py-2 text-center">{prod.total_material} {prod.valorTotalProducto}</td>
                  <td>
                    <button ref={clickEliminarButton} className='mt-2' onClick={(e) => eliminarMaterial(e, index)}>❌</button>
                  </td>
                </tr>
              ))}
                                        </>
                                    </tbody>
                                </table>

                            </div>
                        </div>
                        {/* El resto del formulario */}
                    </div>
                    <form className='mt-2 py-5'>
                        <p className="text-white">Codigo Pedido:  {pedido.codigo_pedido}</p>
                        <p className="text-white">Descuento:  {pedido.descuento_total}</p>
                        <p className="text-white">Sub Total:  {pedido.subtotal}</p>
                        <p className="text-white">IVA (19%): {pedido.iva}</p>
                        <p className="text-white">Valor Total:  {pedido.valor_total}</p>
                        <p className="text-white">Fecha de Creación: {`pedido.fecha_creacion`}</p>
                        <div className='flex justify-center mt-4'>
                            <button onClick={actualizarPedido} className='p-2 rounded-lg bg-blue-600 text-white w-[200px]'>Actualizar Pedido</button>
                        </div>
                    </form>
                </form>
            </div>
        </div>
    );
};

export default EditPedido;




