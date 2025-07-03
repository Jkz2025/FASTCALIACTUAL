import { useState } from "react";
import { useFetchPedidos } from "../Hooks/useFetchPedidos";
import { useNavigate } from "react-router-dom";
import { Search, X } from 'lucide-react';
import styles from "../../style";

const Pedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  useFetchPedidos(setPedidos);
  const [showModal, setShowModal] = useState(false);
  const [pedidoDetalle, setPedidoDetalle] = useState(null);

  const toggleModal = (pedido) => {
    setPedidoDetalle(pedido);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setPedidoDetalle(null);
  };

  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header Card */}
        <div className="bg-slate-900/90 backdrop-blur-sm rounded-b-2xl shadow-2xl p-8 border-x border-b border-slate-800">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-white">
              Pedidos
            </h1>

            <div className="flex space-x-4">
            <button
              onClick={() => navigate('/FacturacionyPedidos/CrearPedido')}
              className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-blue-500/25"
            >
              <Search size={20} />
              Nuevo Pedido
            </button>
            <button
              // onClick={() => navigate('/FacturacionyPedidos/CrearPedido')}
              className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-blue-500/25"
            >
              <Search size={20} />
              Buscar Pedido
            </button>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="mt-8 mx-4 bg-slate-900/90 backdrop-blur-sm rounded-2xl shadow-2xl p-6 border border-slate-800">
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-slate-800 text-gray-200">
                  <th className="px-6 py-3 text-left text-sm font-semibold">Código Pedido</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Nombre</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Bodega</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Producto</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Cantidad</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">IVA</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Total</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Fecha Creación</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Estado</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {pedidos.map((pedido) => (
                  <tr 
                    key={pedido.id}
                    className="text-gray-300 hover:bg-slate-800/50 transition-colors"
                  >
                    <td className="px-6 py-4">{pedido.codigo_pedido}</td>
                    <td className="px-6 py-4">{pedido.user_id} - {pedido.user_name}</td>
                    <td className="px-6 py-4">{pedido.bodega_id}</td>
                    <td className="px-6 py-4">{pedido.material_id}</td>
                    <td className="px-6 py-4">{pedido.cantidad}</td>
                    <td className="px-6 py-4">{pedido.iva}</td>
                    <td className="px-6 py-4">{pedido.valor_total}</td>
                    <td className="px-6 py-4">{pedido.fecha_creacion}</td>
                    <td className="px-6 py-4">{pedido.estado}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-4">
                        <button
                          className="text-blue-400 hover:text-blue-300 transition-colors"
                          onClick={() => toggleModal(pedido)}
                        >
                          Ver detalles
                        </button>
                        <button
                          className="text-blue-400 hover:text-blue-300 transition-colors"
                          onClick={() => navigate(`/FacturacionyPedidos/Pedidos/Editar/${pedido.codigo_pedido}`)}
                        >
                          Editar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal */}
        {showModal && pedidoDetalle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto bg-slate-900/80 backdrop-blur-sm">
            <div className="bg-slate-900 rounded-2xl shadow-2xl w-full max-w-lg border border-slate-800">
              <div className="flex items-center justify-between p-6 border-b border-slate-800">
                <h3 className="text-xl font-bold text-white">Detalles del Pedido</h3>
                <button
                  className="text-gray-400 hover:text-gray-200 transition-colors"
                  onClick={closeModal}
                >
                  <X size={24} />
                </button>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {Object.entries(pedidoDetalle).map(([key, value]) => (
                    <div key={key} className="grid grid-cols-2 gap-4">
                      <div className="text-gray-400 font-medium capitalize">
                        {key.replace(/_/g, " ")}
                      </div>
                      <div className="text-gray-200">
                        {value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pedidos;