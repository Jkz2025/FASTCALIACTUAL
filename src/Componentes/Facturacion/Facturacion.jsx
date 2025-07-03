import ButtonFastCali from "../ButtonFastCali.jsx/ButtonFastCali";
import { useFetchPedidos } from "../Hooks/useFetchPedidos";
import React, { useState, useEffect } from "react";
import { supabase } from "../../CreateClient";
import styles from "../../../src/style";
import { useFetchUsers } from "../Hooks/useFetchUsers";
import { useFetchBodegas } from "../Hooks/useFetchBodegas";
import { useFetchEmpresas } from "../Hooks/useFetchEmpresa";
import { useFetchHistorialP } from "../Hooks/useFetchHistorialP";

const Facturacion = () => {
  const [pedidos, setPedidos] = useState([]);
  const [pedidoDescripcion, setPedidoDescripcion] = useState([]);
  const [pedidosSeleccionados, setPedidosSeleccionados] = useState([]);
  const [cargandoPedidos, setCargandoPedidos] = useState(true);
  const [selectAll, setSelectAll] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [pedidoDetalle, setPedidoDetalle] = useState(null);
  const [empresa, setEmpresa] = useState([]);
  const [users, setUsers] = useState([]);
  const [bodegas, setBodegas] = useState([]);
  const [usuariosSeleccionados, setUsuariosSeleccionados] = useState([]);
  const [bodegasSeleccionadas, setBodegasSeleccionadas] = useState([]);
  const [usuariosFinal, setUsuariosFinal] = useState([]);
  const [bodegaFinal, setBodegasFinal] = useState([]);
  const [facturando, setFacturando] = useState(false);
  const [mensaje, setMensaje] = useState('');

  useFetchEmpresas(setEmpresa);
  useFetchUsers(setUsers);
  useFetchBodegas(setBodegas);
  useFetchPedidos(setPedidos);
  useFetchHistorialP(setPedidoDescripcion);

  // Función para recargar pedidos automáticamente
  const recargarPedidos = async () => {
    try {
      const { data, error } = await supabase
        .from('pedidos')
        .select('*')
        .order('fecha_creacion', { ascending: false });

      if (error) throw error;
      setPedidos(data || []);
    } catch (error) {
      console.error('Error al recargar pedidos:', error);
    }
  };

  // Función para recargar bodegas (para actualizar consecutivos)
  const recargarBodegas = async () => {
    try {
      const { data, error } = await supabase
        .from('bodegas')
        .select('*');

      if (error) throw error;
      setBodegas(data || []);
    } catch (error) {
      console.error('Error al recargar bodegas:', error);
    }
  };

  // Suscripción a cambios en tiempo real para pedidos
  useEffect(() => {
    const suscripcionPedidos = supabase
      .channel('pedidos_changes')
      .on('postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'pedidos'
        },
        (payload) => {
          console.log('Cambio detectado en pedidos:', payload);
          recargarPedidos();
        }
      )

    return () => {
      supabase.removeChannel(suscripcionPedidos);
    };
  }, []);

  // Mostrar mensaje temporal
  const mostrarMensaje = (texto, tipo = 'success') => {
    setMensaje({ texto, tipo });
    setTimeout(() => setMensaje(''), 3000);
  };

  useEffect(() => {
    console.log("=== DEBUG COMPLETO PEDIDOS ===")
    console.log("Total pedidos cargados:", pedidos.length)

    if (pedidos.length > 0) {
      console.log("Ejemplo de pedido:", pedidos[0]);
      console.log("Códigos de pedidos disponibles:", pedidos.map(p => p.codigo_pedido));
    }

    // Actualizar estado de carga
    setCargandoPedidos(false);
  }, [pedidos]);

  const toggleModal = (pedido) => {
    const userDetail = users.find((user) => user.id === pedido.user_id);
    const bodegaDetail = bodegas.find(
      (bodega) => bodega.id === pedido.bodega_id
    );

    setPedidoDetalle({
      ...pedido,
      userDetail,
      bodegaDetail,
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setPedidoDetalle(null);
  };

  const handleSelectPedido = (id) => {
    if (pedidosSeleccionados.includes(id)) {
      setPedidosSeleccionados(
        pedidosSeleccionados.filter((pedidoId) => pedidoId !== id)
      );
    } else {
      setPedidosSeleccionados([...pedidosSeleccionados, id]);
    }
  };

  useEffect(() => {
    console.log("=== DEBUG COMPLETO PEDIDO DESCRIPCION ===")
    console.log("Total detalles cargados", pedidoDescripcion.length);

    if (pedidoDescripcion.length > 0) {
      console.log("Ejemplo completo de detalle:", pedidoDescripcion[0]);
      console.log("Todas las propiedades del primero detalle:", Object.keys(pedidoDescripcion[0]))

      const propiedadesPedido = Object.keys(pedidoDescripcion[0]).filter(key => key.toLowerCase().includes("pedido"))
      console.log("Propiedades que contienen pedido:", propiedadesPedido)

      console.log("Primeros 3 detalles completos:", pedidoDescripcion.slice(0, 3))
    }

  }, [pedidoDescripcion])

  useEffect(() => {
    if (pedidosSeleccionados.length > 0) {
      infoUsuarios();
      infoBodega();
    } else {
      setUsuariosFinal([]);
      setBodegasFinal([]);
    }
  }, [pedidosSeleccionados]);

  const infoBodega = () => {
    const bodegaIds = pedidosSeleccionados
      .map((pedidoId) => {
        const pedido = pedidos.find((p) => p.id === pedidoId);
        return pedido ? pedido.bodega_id : null;
      })
      .filter((bodegaId) => bodegaId !== null);

    const bodegasSeleccionadas = bodegaIds
      .map((bodegaId) => bodegas.find((b) => b.id === bodegaId))
      .filter((bodega) => bodega !== undefined);

    setBodegasFinal(bodegasSeleccionadas);
  };

  const infoUsuarios = () => {
    const userIds = pedidosSeleccionados
      .map((pedidoId) => {
        const pedido = pedidos.find((p) => p.id === pedidoId);
        return pedido ? pedido.user_id : null;
      })
      .filter((userId) => userId !== null);

    const usuariosSeleccionados = userIds
      .map((userId) => users.find((u) => u.id === userId))
      .filter((user) => user !== undefined);
    setUsuariosFinal(usuariosSeleccionados);
  };

  // Función para buscar los detalles del pedido y asi poder insertarlos
  const buscarDetallesPedido = (pedido) => {

    console.log("=== DEBUG BUSCAR DETALLES PEDIDO ===")
    console.log(`Buscandod etalles para codigo_pedido: ${pedido.codigo_pedido}
      (tipo: ${typeof pedido.codigo_pedido})
      `);
    console.log(`Total pedidoDescripcion disponibles: ${pedidoDescripcion.length}`)


    if (pedidoDescripcion.length > 0) {
      console.log(`Ejemplo de pedidoDescripcion[0]:`, pedidoDescripcion[0]);
      console.log(`Tipo de codigo_pedido en pedidoDescripcion:`, typeof pedidoDescripcion[0].codigo_pedido)
      console.log(`Codigos disponibles en pedidoDescripcion:`, 
        [...new Set(pedidoDescripcion.map(d => d.codigo_pedido))].slice(0, 10)
      )
    }

    // Search by codigo_pedido which is the only common field between invoices and their details
    let detalles = pedidoDescripcion.filter(
      detalle => String(detalle.codigo_pedido) === String(pedido.codigo_pedido)
    );

    console.log(`Detalles encontrados: ${detalles.length}`)
    if (detalles.length > 0)
      console.log(`Primer detalle encontrado`, detalles[0])
    return detalles;
  };

  const handleFacturarClick = async () => {
    if (facturando) return;

    setFacturando(true);

    try {
      // Validaciones iniciales
      if (pedidosSeleccionados.length === 0) {
        mostrarMensaje('Por favor seleccione al menos un pedido', 'error');
        return;
      }

      const emisor = empresa.length > 0 ? empresa[0] : null;
      if (!emisor) {
        mostrarMensaje('No se encontró información de la empresa emisora', 'error');
        return;
      }

      const bodegasActualizadas = {};
      const pedidosProcesados = [];
      const facturasParaInsertar = [];
      const detalleParaInsertar = [];
      const pedidosSinDetalles = []; // Para rastrear pedidos sin detalles

      // Procesar cada pedido seleccionado
      for (const pedidoId of pedidosSeleccionados) {
        const pedido = pedidos.find((p) => p.id === pedidoId);
        if (!pedido) continue;

        console.log("=== INFORMACION DEL PEDIDO ===")
        console.log(`Procesando pedido ${pedido.id}, Codigo: ${pedido.codigo_pedido}`)

        // Buscar detalles del pedido usando la función optimizada
        const pedido_descripciones = buscarDetallesPedido(pedido);

        console.log("DETALLES DE PEDIDO")
        console.log(`detalles encontrados para los pedidos ${pedido.codigo_pedido}, detalles: ${pedido_descripciones.length}`)

        if (pedido_descripciones.length === 0) {
          console.warn(`No se encontraron descripciones para el pedido ${pedido.codigo_pedido}`);
          pedidosSinDetalles.push(pedido.codigo_pedido);
          continue; // Skip this order instead of creating backup
        }

        if (pedido_descripciones.length > 0) {
          console.log("Ejemplo de detalles", pedido_descripciones[0])
        }

        const usuario = users.find((u) => u.id === pedido.user_id);
        const bodega = bodegas.find((b) => b.id === pedido.bodega_id);

        // Validar que todos los datos necesarios estén presentes
        if (!usuario || !bodega || !bodega.prefijo || bodega.consecutivo_actual === undefined) {
          console.error(`Datos incompletos para pedido ${pedidoId}`);
          continue;
        }

        // Calcular el próximo consecutivo de factura
        let consecutivoActualizado;
        if (!bodegasActualizadas[bodega.id]) {
          consecutivoActualizado = bodega.consecutivo_actual + 1;
          bodegasActualizadas[bodega.id] = {
            ...bodega,
            consecutivo_actual: consecutivoActualizado,
          };
        } else {
          consecutivoActualizado = bodegasActualizadas[bodega.id].consecutivo_actual + 1;
          bodegasActualizadas[bodega.id].consecutivo_actual = consecutivoActualizado;
        }

        const numeroFactura = `${bodega.prefijo}-${consecutivoActualizado}`;

        // Preparar datos de la factura
        facturasParaInsertar.push({
          bodega_id: bodega.id,
          bodega_name: pedido.bodega_name,
          empleado_id: pedido.empleado_id,
          empleado_name: pedido.empleado,
          codigo_pedido: pedido.codigo_pedido,
          factura_id: numeroFactura,
          tipo_documento_emisor: emisor.tipo_documento,
          numero_documento_emisor: emisor.numero_documento,
          direccion_emisor: emisor.direccion,
          nombre_emisor: emisor.razon_social,
          telefono_emisor: emisor.telefono,
          id_receptor: usuario.id,
          nombre_receptor: usuario.nombre_final,
          direccion_receptor: usuario.direccion,
          telefono_receptor: usuario.telefono,
          email_receptor: usuario.email,
          tipo_documento_receptor: usuario.tipo_documento,
          numero_documento_receptor: usuario.numero_documento_receptor,
          subtotal: pedido.subtotal,
          valor_total: pedido.valor_total,
          firma_digital: emisor.firma_digital,
          iva: pedido.iva,
          resolucion_facturacion: bodega.resolucion,
          prefijo: bodega.prefijo,
          consecutivo: consecutivoActualizado,
          fecha_emision: pedido.fecha_creacion,
          fecha_facturacion: pedido.fecha_creacion,
          forma_pago: pedido.forma_pago,
          moneda: "COP",
          medios_pago: pedido.medio_pago,
          rangoInicial: bodega.fecha_inicio,
          rangoFinal: bodega.fecha_fin,
        });

        // Preparar detalles de la factura (productos)
        for (const descripcion of pedido_descripciones) {
          // Validar campos requeridos con valores por defecto
          const materialId = descripcion.material_id || null;
          const materialName = descripcion.material_name || "Producto sin nombre";
          const precioVenta = descripcion.precio_venta || 0;
          const cantidad = descripcion.cantidad || 0;
          const descuento = descripcion.descuento || 0;
          const descuentoPorcentaje = descripcion.descuento_porcentaje || 0;

          // Calcula valor total si no se tiene presente
          const valorTotal = descripcion.total_material || (precioVenta * cantidad);

          detalleParaInsertar.push({
            factura_id: numeroFactura,
            material_id: materialId,
            descripcion: materialName,
            lista_precios: descripcion.lista_precios || null,
            valor_unitario: precioVenta,
            cantidad: cantidad,
            descuento_porcentaje: descuentoPorcentaje,
            descuento: descuento,
            valor_total: valorTotal,
            codigo_pedido: pedido.codigo_pedido,
            fecha_creacion: pedido.fecha_creacion,
          });
        }

        pedidosProcesados.push(pedidoId);
      }

      // Mostrar mensaje sobre pedidos sin detalles
      if (pedidosSinDetalles.length > 0) {
        mostrarMensaje(`Advertencia: ${pedidosSinDetalles.length} pedidos sin detalles fueron omitidos: ${pedidosSinDetalles.join(', ')}`, 'error');
      }

      // Validar que hay datos para insertar
      if (facturasParaInsertar.length === 0) {
        mostrarMensaje("No se generaron facturas. Verifique los datos de los pedidos", 'error');
        return;
      }

      // Insertar facturas en la base de datos
      const { data: facturasData, error: facturasError } = await supabase
        .from("facturacion")
        .insert(facturasParaInsertar);

      if (facturasError) {
        console.error("Error al insertar facturas:", facturasError.message);
        throw facturasError;
      }

      // Insertar detalles de las facturas
      if (detalleParaInsertar.length > 0) {
        const { error: detallesError } = await supabase
          .from("factura_detalle")
          .insert(detalleParaInsertar);

        if (detallesError) {
          console.error("Error al insertar detalles:", detallesError);
          throw detallesError;
        }
      }

      // Actualizar consecutivos de las bodegas
      const updatePromises = [];
      for (const bodegaId in bodegasActualizadas) {
        const { consecutivo_actual } = bodegasActualizadas[bodegaId];
        updatePromises.push(
          supabase
            .from("bodegas")
            .update({ consecutivo_actual })
            .eq("id", bodegaId)
        );
      }

      await Promise.all(updatePromises);

      // Actualizar estado de los pedidos procesados
      if (pedidosProcesados.length > 0) {
        const { error: estadoError } = await supabase
          .from("pedidos")
          .update({ estado: "🟢" })
          .in("id", pedidosProcesados);

        if (estadoError) {
          console.error("Error al actualizar estado:", estadoError);
        }

        // Actualizar estado local inmediatamente
        setPedidos(prevPedidos =>
          prevPedidos.map(pedido =>
            pedidosProcesados.includes(pedido.id)
              ? { ...pedido, estado: "🟢" }
              : pedido
          )
        );

        // Limpiar selecciones
        setPedidosSeleccionados([]);
        setSelectAll(false);

        // Recargar bodegas para actualizar consecutivos
        await recargarBodegas();

        let mensaje = `${pedidosProcesados.length} pedidos facturados correctamente`;
        if (pedidosSinDetalles.length > 0) {
          mensaje += `. ${pedidosSinDetalles.length} pedidos omitidos por falta de detalles.`;
        }
        mostrarMensaje(mensaje, 'success');
      }
    } catch (error) {
      console.error("Error completo:", error);
      mostrarMensaje(`Error al facturar los pedidos: ${error.message}`, 'error');
    } finally {
      setFacturando(false);
    }
  };


  const handleSelectAll = () => {
    const pedidosDisponibles = pedidos.filter(pedido => pedido.estado !== "🟢");

    if (selectAll) {
      setPedidosSeleccionados([]);
    } else {
      setPedidosSeleccionados(pedidosDisponibles.map((pedido) => pedido.id));
    }
    setSelectAll(!selectAll);
  };

  // Filtrar pedidos que no están facturados
  const pedidosDisponibles = pedidos.filter(pedido => pedido.estado !== "🟢");

  return (
    <>
      <div className="max-w-4xl mx-auto my-8">
        <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-black rounded-lg shadow-lg p-6">
          {/* Mensaje de estado */}
          {mensaje && (
            <div className={`mb-4 p-3 rounded-lg text-white text-center ${mensaje.tipo === 'success' ? 'bg-green-600' : 'bg-red-600'
              }`}>
              {mensaje.texto}
            </div>
          )}

          <div className={`${styles.flexCenter} sm:ml-10 ml-0 sm:mt-0 mt-10`}>
            <ButtonFastCali
              onClick={handleFacturarClick}
              text={facturando ? 'Facturando...' : 'Facturar'}
              disabled={facturando || pedidosSeleccionados.length === 0}
            />
          </div>

          {/* Indicador de pedidos seleccionados */}
          {pedidosSeleccionados.length > 0 && (
            <div className="mt-4 p-3 bg-blue-600 text-white rounded-lg text-center">
              {pedidosSeleccionados.length} pedido(s) seleccionado(s) para facturar
            </div>
          )}

          {cargandoPedidos ? (
            <div className="text-center mt-10">
              <p className="text-white">Cargando pedidos...</p>
            </div>
          ) : (
            <div className="overflow-x-auto mt-10">
              {pedidosDisponibles.length === 0 ? (
                <div className="text-center text-white p-8">
                  <p>No hay pedidos disponibles para facturar</p>
                </div>
              ) : (
                <table className="w-full table-auto bg-gray-900 rounded-lg text-white">
                  <thead>
                    <tr>
                      <th className="border px-4 py-2 bg-gray-800">
                        <input
                          type="checkbox"
                          onChange={handleSelectAll}
                          checked={selectAll}
                          disabled={facturando}
                        />
                      </th>
                      <th className="border px-4 py-2 bg-gray-800">
                        Codigo Pedido
                      </th>
                      <th className="border px-4 py-2 bg-gray-800">Bodega</th>
                      <th className="border px-4 py-2 bg-gray-800">Cliente</th>
                      <th className="border px-4 py-2 bg-gray-800">Total</th>
                      <th className="border px-4 py-2 bg-gray-800">Estado</th>
                      <th className="border px-4 py-2 bg-gray-800">Pedido</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pedidosDisponibles.map((pedido, index) => (
                      <tr
                        key={pedido.codigo_pedido}
                        className={
                          index % 2 === 0
                            ? "bg-gray-800"
                            : "bg-gray-700 hover:bg-gray-600"
                        }
                      >
                        <td className="border px-4 py-2">
                          <input
                            type="checkbox"
                            onChange={() => handleSelectPedido(pedido.id)}
                            checked={pedidosSeleccionados.includes(pedido.id)}
                            disabled={facturando}
                          />
                        </td>
                        <td className="border px-4 py-2">
                          {pedido.codigo_pedido}
                        </td>
                        <td className="border px-4 py-2">{pedido.bodega_id}</td>
                        <td className="border px-4 py-2">{pedido.user_name}</td>
                        <td className="border px-4 py-2">
                          {pedido.valor_total}
                        </td>
                        <td className="border px-4 py-2">
                          <span className={`px-2 py-1 rounded-full ${pedido.estado === "🟢"

                            }`}>
                            {pedido.estado || "Pendiente"}
                          </span>
                        </td>
                        <td className="border px-4 py-2 cursor-pointer">
                          <button
                            className="underline text-blue-500 hover:text-blue-700 focus:outline-none"
                            onClick={() => toggleModal(pedido)}
                          >
                            Ver detalles
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {/* Modal para mostrar detalles del pedido */}
          {showModal && pedidoDetalle && (
            <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto bg-gray-500 bg-opacity-75">
              <div className="relative w-auto max-w-3xl mx-auto my-6 bg-white rounded-lg shadow-lg">
                <div className="relative flex flex-col w-full border-0 rounded-lg outline-none focus:outline-none">
                  <div className="flex items-start justify-between p-5 border-b border-solid rounded-t">
                    <h3 className="text-lg font-semibold">
                      Detalles del Pedido
                    </h3>
                    <button className="" onClick={closeModal}>
                      <span className="text-black h-6 w-6 text-2xl block">
                        ❌
                      </span>
                    </button>
                  </div>
                  <div className="relative p-6 flex-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Campo
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Valor
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            Codigo Pedido
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {pedidoDetalle.codigo_pedido}
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            Usuario
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {pedidoDetalle.user_id} - {pedidoDetalle.user_name}
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            Bodega
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {pedidoDetalle.bodega_id}
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            Material
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {pedidoDetalle.material_id}
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            Cantidad
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {pedidoDetalle.cantidad}
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            IVA
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {pedidoDetalle.iva}
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            Valor Total
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {pedidoDetalle.valor_total}
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            Fecha Creación
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {pedidoDetalle.fecha_creacion}
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            Medio Pago
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {pedidoDetalle.forma_pago}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Facturacion;