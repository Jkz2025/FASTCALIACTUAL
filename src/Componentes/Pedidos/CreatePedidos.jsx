import React, { useState, useEffect } from "react";
import { supabase } from "../../CreateClient";
import { Link } from "react-router-dom";
import Button from "../Dashboard/Components/Button.jsx";
import { useFetchEmpleados } from "../Hooks/useFetchEmpleados.jsx";
import { useFetchListasPrecioMateriales } from "../Hooks/useFetchListasPrecioMateriales.jsx";
import ButtonFastCali from "../ButtonFastCali.jsx/ButtonFastCali.jsx";
import { useRef } from "react";

const CreatePedidos = () => {
  const [empleados, setEmpleados] = useState([]);
  const [materialesAgregados, setMaterialesAgregados] = useState([]);
  const [bodegas, setBodegas] = useState([]);
  const [users, setUsers] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [listasPrecioMateriales, setListasPreciosMateriales] = useState([]);
  const [uniqueMaterials, setUniqueMaterials] = useState([]);
  const [descuentoTotal, setDescuentoTotal] = useState(null);
  const [listasParaMaterial, setListasParaMaterial] = useState([]);
  const [codigoPedido, setCodigoPedido] = useState([]);
  const [descuentoLista, setDescuentoLista] = useState(false);

  {
    /*================================================= CONSTANTE PARA ALMACENAR LAS BODEGAS ================================================= */
  }

  const [bodegaPedido, setBodegaPedido] = useState({
    name: "",
    id: "",
  });

  {
    /*================================================= CONSTANTE PARA EL PRODUCTO DE LAS LISTAS DE PRECIO ================================================= */
  }

  const [lista_precio_material, setLista_Precio_Material] = useState({
    material_id: "",
    material_name: "",
    precio_venta: "",
    descuento: "",
    descuento_porcentaje: "",
    lista_precios: "",
    cantidad: "",
  });

  {
    /*================================================= CONSTANTE QUE ALMACENA PEDIDO ================================================= */
  }

  const fechaCreacion = () => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate())
      .toISOString().split("T")[0]
  }
  const [pedido, setPedido] = useState({
    empleado_id: "", //✅
    empleado: "", //✅
    user_id: "", //✅
    user_name: "", //✅
    codigo_pedido: codigoPedido,
    bodega_id: "", //✅
    bodega_name: "", //✅
    material_id: "",
    material_name: "",
    material_precio: "",
    material_descuento: "",
    cantidad: "",
    descuento_total: "",
    descuento_porcentaje: "",
    subtotal: 0,
    forma_pago: "",
    medio_pago: "",
    iva: 0,
    iva_porcentaje: 0,
    valor_total: 0,
    fecha_creacion: fechaCreacion(),
    estado: "🔴",
  });

  {
    /*================================================= CONSTANTE QUE ALMACENA HISTORIAL PEDIDO ================================================= */
  }

  const [historialPedido, setHistorialPedido] = useState({
    codigo_pedido: codigoPedido,
    material_id: "",
    material_name: "",
    cantidad: "",
    precio_venta: "",
    lista_precios: "",
    descuento_porcentaje: "",
    descuento: "",
    total_material: "",
  });

  {
    /*================================================= USEFETCH TRAE LA TABLA DE LISTAS PRECIO INDIVIDUALES================================================= */
  }
  useFetchListasPrecioMateriales(setListasPreciosMateriales);

  {
    /*================================================= USEFETCH QUE TRAE EL CODIGO PEDIDO ================================================= */
  }

  useEffect(() => {
    const fetchCodigoPedido = async () => {
      const { data, error } = await supabase
        .from("pedidos")
        .select("codigo_pedido")
        .order("id", { ascending: false })
        .limit(1);

      if (error) {
        console.error("Error fetching last codigo_pedido:", error);
      } else {
        const lastCodigo = data.length > 0 ? data[0].codigo_pedido : "0";
        const nextCodigo = (parseInt(lastCodigo) + 1).toString();
        setCodigoPedido(nextCodigo);
        setPedido((prev) => ({ ...prev, codigo_pedido: nextCodigo }));
      }
    };

    fetchCodigoPedido();
  }, []);

  {
    /*================================================= CONSTANTE QUE ALMACENA MATERIALES ================================================= */
  }

  const [materiales, setMateriales] = useState([]);

  {
    /*================================================= useEffect() QUE TRAE UN MATERIAL UNICO DE LA LISTA PARA QUE NO SE REPITAN VARIAS VECES ================================================= */
  }

  useEffect(() => {
    // Función para obtener materiales únicos
    const uniqueMaterials = listasPrecioMateriales.filter(
      (lista, index, self) =>
        index === self.findIndex((m) => m.material_id === lista.material_id)
    );
    setUniqueMaterials(uniqueMaterials);
  }, [materiales]);

  useFetchEmpleados(setEmpleados);

  {
    /*================================================= FUNCION (Crear Pedido) QUE INSERTA LOS PEDIDOS EN LAS TABLAS pedido_historial Y pedidos================================================= */
  }

  async function createPedido(e) {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    function eliminarMaterial(e, index) {
      if (e) {
        e.preventDefault();
      }
      setMaterialesAgregados((prev) => prev.filter((_, i) => i !== index));
    }
    try {
      // Preparar los datos concatenados
      const materialIds = materialesAgregados
        .map((m) => m.material_id)
        .join(",");
      const materialNames = materialesAgregados
        .map((m) => m.material_name)
        .join(",");
      const materialPrecios = materialesAgregados
        .map((m) => m.precio_venta)
        .join(",");
      const materialCantidad = materialesAgregados
        .map((m) => m.cantidad)
        .join(",");
      const materialDescuento = materialesAgregados
        .map((m) => m.descuento)
        .join(",");
      const porcentajeDescuento = materialesAgregados
        .map((m) => m.descuento_porcentaje)
        .join(",");
      const pedidoBodega = pedido.bodega_name;
      const pedidoBodegaId = pedido.bodega_id;
      const pedidoEmpleado = pedido.empleado_id;
      const pedidoCliente = pedido.user_name;

      if (!pedidoBodega) {
        alert("Por favor seleccione una bodega");
      } else if (!pedidoEmpleado) {
        alert("Por favor seleccione un empleado");
      } else if (!pedidoCliente) {
        alert("Por favor seleccione un cliente");
      } else if (!materialIds) {
        alert("Por favor agregue el material");
      } else {
        // Insertar en la tabla 'pedido_historial' para cada material agregado
        for (let material of materialesAgregados) {
          const {
            material_id,
            material_name,
            precio_venta,
            cantidad,
            descuento,
            descuento_porcentaje,
            lista_precios,
            valorTotalProducto,
          } = material;

          // Inserta en la tabla historial pedido
          const { data, error: insertHistorialError } = await supabase
            .from("pedido_historial")
            .insert({
              codigo_pedido: codigoPedido,
              material_id: material_id,
              material_name: material_name,
              cantidad: cantidad,
              precio_venta: precio_venta,
              lista_precios: lista_precios,
              descuento_porcentaje: descuento_porcentaje,
              descuento: descuento,
              total_material: valorTotalProducto,
              bodega_name: pedidoBodega,
              bodega_id: pedidoBodegaId,
              fecha_creacion: fechaCreacion()
            });

          if (insertHistorialError) {
            console.error(
              "Error creating pedido historial:",
              insertHistorialError.message
            );
            alert(
              "Error creating pedido historial: " + insertHistorialError.message
            );
            return;
          }
        }
        // Insertar en la tabla 'pedidos'
        const { error: insertPedidoError } = await supabase
          .from("pedidos")
          .insert({
            ...pedido,
            codigo_pedido: codigoPedido,
            subtotal: subTotal,
            iva: valorIva,
            iva_porcentaje: 19,
            valor_total: valorTotal,
            material_id: materialIds,
            material_name: materialNames,
            material_precio: materialPrecios,
            cantidad: materialCantidad,
            material_descuento: materialDescuento,
            descuento_porcentaje: porcentajeDescuento,
            descuento_total: descuento,
            fecha_creacion: fechaCreacion(),
          });

        if (insertPedidoError) {
          console.error("Error creating pedido:", insertPedidoError.message);
          alert("Error creating pedido: " + insertPedidoError.message);
          return;
        }

        // CAMBIO 1: Mensajes sin necesidad de reiniciar pagina
        alert(`El pedido ${codigoPedido} se creo satisfactoriamente`);

        // CAMBIO 2: Generar nuevo código de pedido
        const nuevoCodigo = (parseInt(codigoPedido) + 1).toString();
        setCodigoPedido(nuevoCodigo)

        // Restablecer el estado del pedido y recargar la página
        setPedido({
          bodega_id: "",
          bodega_name: "",
          estado: "🔴",
          valor_total: 0,
          user_id: "",
          user_name: "",
          empleado: "",
          empleado_id: "",
          material_id: "",
          material_name: "",
          material_precio: "",
          descuento_total: "",
          cantidad: 0,
          iva: 0,
          fecha_creacion: fechaCreacion(),
          forma_pago: "",   // Asegurar reset de campos adicionales
          medio_pago: ""     // Asegurar reset de campos adicionales
        });

        // Resetear materiales y calculos
        setMaterialesAgregados([]);

      }
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("Unexpected error: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  // Referencia para el botón de eliminar indispensable para eliminarse despues de que se crea un pedido
  const clickEliminarButton = useRef();

  {
    /*================================================= FUNCION DE AGREGAR PRODUCTOS ================================================= */
  }

  const agregarProducto = (e) => {
    e.preventDefault();
    const MaterialId = lista_precio_material.material_id;
    const MaterialName = lista_precio_material.material_name;
    const PrecioVenta = lista_precio_material.precio_venta;
    const Cantidad = lista_precio_material.cantidad;
    const Descuento = lista_precio_material.descuento * Cantidad;
    const subTotalProducto = PrecioVenta * Cantidad;
    const valorTotalProducto = subTotalProducto - Descuento;
    const descuentoTotal = Descuento;
    const productoConValorTotal = {
      ...lista_precio_material,
      valorTotalProducto,
      descuentoTotal,
    };
    const ProdYaExiste = materialesAgregados.some(
      (m) => m.material_id === MaterialId
    );

    if (!MaterialId && !MaterialName) {
      alert("Por favor elija un material");
      return;
    } else if (!Cantidad || Cantidad <= 0) {
      alert("Por favor escriba una cantidad");
      return;
    } else if (ProdYaExiste) {
      alert("El producto ya fue agregado ");
      setLista_Precio_Material({
        material_id: "",
        material_name: "",
        precio_venta: "",
        descuento: "",
        descuento_porcentaje: "",
        lista_precios: "",
        cantidad: "",
      });
      return;
    } else {
      if (Descuento) {
        setDescuentoTotal(true);
        setMaterialesAgregados([...materialesAgregados, productoConValorTotal]);
        setLista_Precio_Material({
          material_id: "",
          material_name: "",
          precio_venta: "",
          descuento: "",
          descuento_porcentaje: "",
          lista_precios: "",
          cantidad: "",
        });
      } else {
        setMaterialesAgregados([...materialesAgregados, productoConValorTotal]);
        setLista_Precio_Material({
          material_id: "",
          material_name: "",
          precio_venta: "",
          descuento: "",
          descuento_porcentaje: "",
          lista_precios: "",
          cantidad: "",
        });
      }
    }
  };

  {
    /*================================================= CONSTANTE SUBTOTAL ================================================= */
  }

  const subTotal = materialesAgregados.reduce(
    (acc, prod) => acc + prod.valorTotalProducto,
    0
  );
  const descuento = materialesAgregados.reduce(
    (acc, prod) => acc + prod.descuentoTotal,
    0
  );

  {
    /*================================================= CONSTANTE IVA ================================================= */
  }

  const valorIva = (subTotal * 19) / 100;

  {
    /*================================================= CONSTANTE VALOR TOTAL ================================================= */
  }

  const valorTotal = subTotal + valorIva;

  const handleClickAgregarCliente = () => { };

  // TRAE LOS DATOS DE BODEGA USERS Y MATERIALES
  useEffect(() => {
    const fetchBodegas = async () => {
      const { data } = await supabase.from("bodegas").select("*");
      setBodegas(data);
    };
    const fetchUsers = async () => {
      const { data } = await supabase.from("users").select("*");
      setUsers(data);
    };
    const fetchMateriales = async () => {
      const { data } = await supabase.from("materiales").select("*");
      setMateriales(data);
    };
    fetchBodegas();
    fetchUsers();
    fetchMateriales();
  }, []);

  {
    /*================================================= FUNCION SENCILLA HANDLE CHANGE PARA BODEGA ================================================= */
  }

  const handleChangeBodega = (e) => {
    const selectedBodega = bodegas.find(
      (b) => b.id === parseInt(e.target.value, 10)
    );
    if (selectedBodega) {
      setPedido((prevPedido) => ({
        ...prevPedido,
        bodega_id: selectedBodega.id,
        bodega_name: selectedBodega.name,
      }));
    } else {
      console.log("Bodega not found");
    }
  };

  {
    /*================================================= FUNCION SENCILLA HANDLECHANGE PARA CLIENTE ================================================= */
  }

  const handleUserChange = (e) => {
    const selectedUser = users.find(
      (user) => user.id === parseInt(e.target.value, 10)
    );
    console.log("Selected User:", selectedUser);

    if (selectedUser) {
      console.log("User Name:", selectedUser.name);
      console.log("User Apellido:", selectedUser.apellido);

      setPedido((prevPedido) => ({
        ...prevPedido,
        user_id: selectedUser.id,
        user_name: `${selectedUser.name} ${selectedUser.apellido}`,
      }));
    } else {
      console.error("User not found");
    }
  };

  {
    /*================================================= FUNCION SENCILLA HANDLECHANGE EMPLEADO ================================================= */
  }

  const handleEmpleadoChange = (e) => {
    const selectedEmpleado = empleados.find(
      (empleado) => empleado.id === parseInt(e.target.value, 10)
    );
    console.log("Selected Empleado:", selectedEmpleado);

    if (selectedEmpleado) {
      console.log("Empleado Name:", selectedEmpleado.nombre);
      console.log("Empleado Apellido:", selectedEmpleado.apellido);

      setPedido((prevPedido) => ({
        ...prevPedido,
        empleado_id: selectedEmpleado.id,
        empleado: `${selectedEmpleado.nombre} ${selectedEmpleado.apellido}`,
      }));
    } else {
      console.error("User not found");
    }
  };

  const handleMedioPago = (e) => {
    const select = e.target.value;

    setPedido((prevFormData) => ({
      ...prevFormData,
      medio_pago: select,
    }));
  };

  const handleFormaPago = (e) => {
    const select = e.target.value;

    setPedido((prevFormData) => ({
      ...prevFormData,
      forma_pago: select,
    }));
  };

  {
    /*================================================= FUNCION QUE SINCRONIZA ID Y NOMBRE ================================================= */
  }
  const handleIdAndName = (e) => {
    const select = e.target.value;
    const selectType = e.target.name; // Obtiene el nombre del select que se está usando

    // Busca el material seleccionado según el tipo de selector
    const selectedMaterial = listasPrecioMateriales.find(lista =>
      selectType === "material_id"
        ? lista.material_id === select  // Si es material_id, compara por ID
        : lista.material_name === select // Si es material_name, compara por nombre
    );

    if (selectedMaterial) {
      setLista_Precio_Material({ ...selectedMaterial });

      // Filtrar listas de precios para el material seleccionado
      const listasParaMaterial = listasPrecioMateriales.filter(
        (lista) => lista.material_id === selectedMaterial.material_id
      );
      setListasParaMaterial(listasParaMaterial);
    }
  };

  {
    /*================================================= FUNCION QUE SETEA PRECIO LISTA / PRECIO_VENTA / DESCUENTO AL ELEGIR LISTA================================================= */
  }
  const handleChangeLista = (e) => {
    const { name, value } = e.target;

    // Actualizar el estado de lista_precio_material con el nombre de la lista seleccionada
    setLista_Precio_Material((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    const listaSelected = listasParaMaterial.find(
      (l) => l.lista_precios === value
    );
    if (listaSelected) {
      setLista_Precio_Material({ ...listaSelected });
    }
  };

  {
    /*================================================= FUNCION QUE ELIMNA PRODUCTOS AGREGADOS================================================= */
  }

  const eliminarMaterial = (e, index) => {
    e.preventDefault();
    setMaterialesAgregados((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    if (valorTotal === 0) {
      setDescuentoTotal(false);
    }
  }, [valorTotal]);

  useEffect(() => {
    const listaConDescuento = listasParaMaterial.map(
      (l) => l.descuento_porcentaje
    );
    if (listaConDescuento.some((descuento) => descuento > 0)) {
      setDescuentoLista(true);
    } else if (listaConDescuento.some((descuento) => (descuento = 0))) {
      setDescuentoLista(false);
    }
  }, [listasParaMaterial]);

  return (
    <div className="max-w-5xl mx-auto my-8 mt-40">
      {/*================================================= TABLA DE CREAR PEDIDOS ================================================= */}
      <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-black rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-white mb-4">Crear Pedido</h1>
        {/*================================================= FORMULARIO CREAR PEDIDOS ================================================= */}
        <form className="flex flex-col gap-4">
          {/*================================================= DIV QUE ORGANIZA TODO ================================================= */}
          <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-black rounded-lg shadow-lg p-6">
            {/*================================================= BODEGA / EMPLEADO / CLIENTE   ================================================= */}
            <div className="flex items-center gap-2 ">
              {" "}
              {/* Contenedor del select y la imagen */}
              <select
                name="bodega_id"
                value={pedido.bodega_id}
                onChange={handleChangeBodega}
                className="p-2 rounded-lg bg-gray-800 text-white"
              >
                <option value="">Selecciona una bodega</option>
                {bodegas.map((bodega) => (
                  <option key={bodega.id} value={bodega.id}>
                    {bodega.name}
                  </option>
                ))}
              </select>
              <select
                name="empleado"
                value={pedido.empleado_id}
                onChange={handleEmpleadoChange}
                className="p-2 rounded-lg bg-gray-800 text-white"
              >
                <option value="">Selecciona un Empleado</option>
                {empleados.map((empleado) => (
                  <option key={empleado.empleado_id} value={empleado.id}>
                    {" "}
                    {empleado.nombre} {empleado.apellido} - {empleado.id}{" "}
                  </option>
                ))}
              </select>
              <img
                className="h-[40px] cursor-pointer"
                onClick={handleClickAgregarCliente}
                src={"agregar"}
                alt=""
              />
              <select
                name="user_id"
                value={pedido.user_id}
                onChange={handleUserChange}
                className="p-2 rounded-lg bg-gray-800 text-white"
              >
                <option value="">Selecciona un cliente</option>
                {users.map((user) => (
                  <option key={user.user_id} value={user.id}>
                    {user.name} {user.apellido} - {user.id}
                  </option>
                ))}
              </select>
              <img
                className="h-[40px] cursor-pointer"
                onClick={handleClickAgregarCliente}
                src={"agregar"}
                alt=""
              />
            </div>

            {/*================================================= SELECT FORMA PAGO   ================================================= */}
            <div className="flex items-center gap-2 py-4">
              {" "}
              {/* Contenedor del select y la imagen */}
              <select
                name="forma_pago"
                value={pedido.forma_pago}
                onChange={handleFormaPago}
                className="p-2   rounded-lg bg-gray-800 text-white"
              >
                <option value="" disabled selected>
                  Selecciona Forma de Pago
                </option>
                <option value="Efectivo">Efectivo</option>
                <option value="Tarjeta Credito">Tarjeta de Credito</option>
                <option value="Tarjeta">Tarjeta de Debito</option>
                <option value="Transferencia">Transferencia Bancaria</option>
                <option value="Cheque">Cheque</option>
                <option value="Credito">Credito</option>
                <option value="Consignacion">Consignacion Bancaria</option>
                <option value="Nequi">Nequi</option>
                <option value="Daviplata">Daviplata</option>
                <option value="Bancolombia">Bancolombia a la mano</option>
              </select>
              {/*================================================= SELECT MEDIO PAGO   ================================================= */}
              <select
                name="medio_pago"
                value={pedido.medio_pago}
                onChange={handleMedioPago}
                className="p-2 px-4  rounded-lg bg-gray-800 text-white"
              >
                <option value="" disabled selected>
                  Selecciona Medio Pago
                </option>
                <option value="Efectivo">Efectivo</option>
                <option value="Transferencia Debito">
                  Transferencia Debito
                </option>
                <option value="Transferencia Credito">
                  Transferencia Credito
                </option>
                <option value="Consignacion Bancaria">
                  Consignacion Bancaria
                </option>
                <option value="Cheque">Cheque</option>
                <option value="POS">POS</option>
                <option value="Debito automatico">Debito automatico</option>
              </select>
            </div>
            {/*================================================= TABLA DE PRODUCTOS PARA AGREGAR   ================================================= */}
            <div className="max-w-4xl mx-auto ">
              <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-black rounded-lg shadow-lg p-3">
                <table className="w-full table-auto bg-gray-900 rounded-lg text-white">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 text-center bg-gray-800">ID</th>
                      <th className="px-4 py-2 text-center bg-gray-800">
                        Material
                      </th>
                      <th className="px-4 py-2 text-center bg-gray-800">
                        Lista
                      </th>
                      <th className="px-4 py-2 text-center bg-gray-800">
                        Precio
                      </th>
                      <th className="px-4 py-2 text-center bg-gray-800">
                        Cantidad
                      </th>
                      <th className="px-4 py-2 text-center bg-gray-800">
                        Descuento
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Aquí puedes colocar las filas de la tabla */}
                  </tbody>
                </table>

                {/*================================================= SELECTS PRODUCTOS PARA AGREGAR   ================================================= */}
                <div className="w-full flex flex-wrap justify-center py-4 gap-4 mt-4">
                  <select
                    className="p-2 w-32 rounded-lg bg-gray-800 text-white"
                    value={lista_precio_material.material_name}
                    onChange={handleIdAndName}
                    name="material_name"
                  >
                    <option value="" disabled>
                      Escribe un material
                    </option>
                    {uniqueMaterials.map((material) => (
                      <option
                        key={material.material_id}
                        value={material.material_name}
                      >
                        {material.material_id}
                      </option>
                    ))}
                  </select>
                  <select
                    className="p-2 w-32 rounded-lg bg-gray-800 text-white"
                    value={lista_precio_material.material_name}
                    onChange={handleIdAndName}
                    name="material_name"
                  >
                    <option value="" disabled>
                      Escribe un material
                    </option>
                    {uniqueMaterials.map((material) => (
                      <option
                        key={material.material_name}
                        value={material.material_name}
                      >
                        {material.material_name}
                      </option>
                    ))}
                  </select>
                  <select
                    name="lista_precios"
                    onChange={handleChangeLista}
                    className="p-2 w-32 rounded-lg bg-gray-800 text-white"
                    value={lista_precio_material.lista_precios}
                  >
                    <option value="" disabled>
                      Selecciona una lista
                    </option>
                    {listasParaMaterial.map((l) => (
                      <option key={l.lista_precios} value={l.lista_precios}>
                        {l.lista_precios} % {l.descuento_porcentaje}
                      </option>
                    ))}
                  </select>
                  <input
                    name="precio_venta"
                    className="p-2 w-32 rounded-lg bg-gray-800 text-white"
                    type="number"
                    step="1"
                    min="0"
                    placeholder="Precio"
                    value={lista_precio_material.precio_venta}
                    onChange={handleChangeLista}
                    readOnly
                  />
                  <input
                    name="cantidad"
                    className="p-2 w-32 rounded-lg bg-gray-800 text-white"
                    type="number"
                    step="1"
                    min="0"
                    placeholder="Cantidad"
                    value={lista_precio_material.cantidad}
                    onChange={(e) =>
                      setLista_Precio_Material({
                        ...lista_precio_material,
                        cantidad: e.target.value,
                      })
                    }
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
                {/*================================================= BOTON AGREGAR PRODUCTO ================================================= */}

                <div className="flex justify-center mt-4">
                  <button
                    onClick={agregarProducto}
                    className="p-2 rounded-lg bg-blue-600 text-white w-[200px]"
                  >
                    Agregar Material
                  </button>
                </div>
              </div>
            </div>
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
            <tbody>
              {materialesAgregados.map((prod, index) => (
                <tr key={prod.material_id}>
                  <td className="border px-4 py-2 text-center">
                    {prod.material_id}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {prod.material_name}
                  </td>
                  <td className="border px-4 py-2">{prod.precio_venta}</td>
                  <td className="border px-4 py-2 text-center">
                    {prod.cantidad}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {prod.lista_precios}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {prod.descuento_porcentaje}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {prod.descuentoTotal}
                  </td>
                  <td className="border px-4 py-2">
                    {prod.valorTotalProducto}
                  </td>
                  <td>
                    <button
                      ref={clickEliminarButton}
                      className="mt-2"
                      onClick={(e) => eliminarMaterial(e, index)}
                    >
                      ❌
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/*================================================= PREVIO DE PEDIDO ================================================= */}
          <form className="mt-2 py-5">
            <p className="text-white">Código Pedido: {codigoPedido}</p>
            <p className="text-white">
              Descuento: {descuento.toLocaleString()}
            </p>
            <p className="text-white">Sub Total: {subTotal.toLocaleString()}</p>
            <p className="text-white">IVA (19%): {valorIva.toLocaleString()}</p>
            <p className="text-white">
              Valor Total: {valorTotal.toLocaleString()}
            </p>
            <p className="text-white">
              Fecha de Creación:{" "}
              {new Date().toISOString()}
            </p>
            <ButtonFastCali text="Crear Pedido" onClick={createPedido} />
          </form>
        </form>
      </div>
      <Link to="/FacturacionyPedidos/Pedidos">
        {" "}
        <div className="py-4 flex justify-center">
          <Button text="🔙" />
        </div>
      </Link>
    </div>
  );
};

export default CreatePedidos;
