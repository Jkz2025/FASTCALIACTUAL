import { useEffect, useState } from 'react'
import { Search, Bell, FileText, TrendingUp, Clock, Users, Plus, Eye, Download } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import { supabase } from '../../../CreateClient'
import { useFetchFacturas } from '../../Hooks/useFetchFacturas'
import { useFetchUsers } from '../../Hooks/useFetchUsers'
const DasboardReal = ({ onSignOut }) => {

  const [session, setSession] = useState(null)
  const [facturas, setFacturas] = useState([])
  const [users, setUsers] = useState([])

  useFetchFacturas(setFacturas)
  useFetchUsers(setUsers)


  useEffect(() => {
    const fetchSession = async () => {
      const { data, error } = await supabase.auth.getSession()
      if (error) {
        console.error('Error obteniendo la session', error)
      } else {
        setSession(data.session)
      }
    }
    fetchSession()
  }, [])

  const dashboardData = {
    totalFacturas: facturas.length,
    facturasEsteMes: facturas.filter(factura => new Date(factura.fecha_facturacion).getMonth() === new Date().getMonth()).length,
    clientesActivos: users.length,
    recentInvoices: facturas.slice(0, 5)


  }


  return (
    <div className='min-h-screen bg-gray-900 text-white pt-20 mt-10'>

      {/* Dashboard Header */}
      <div className="bg-gray-800 shadow-lg border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Bienvenido de vuelta<br />
                <span className=" text-red-500">
                  {session?.user?.user_metadata?.name}
                </span>
              </h1>
              <p className="text-gray-400">
                Aqui tienes un resumen de tu actividad reciente de Facturacion
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400' />
                <input
                  type='text'
                  placeholder='Buscar Facturas'
                  className='pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500
              focus:border-transparent text-white placeholder:text-gray-400
              '
                />
              </div>
              <button>

                <Bell className='h-5 w-5' />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white">
                    3
                  </span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6 lg:px-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="mt-6 bg-gray-800 p-6 rounded-xl shadow-lg border borde-gray-700 hover:shadow-xl transition-shadow">

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">
                  Total Facturas
                </p>
                <p className="text-2xl font-bold">
                  {dashboardData.totalFacturas}
                </p>
              </div>
              <div className="bg-blue-600 p-3 rounded-lg">
                <FileText className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="mt-2 flex items-center">
              <TrendingUp className='h-4 w-4 text-green-400 mr-1' />
              <span className='text-sm text-green-400'>20% este mes</span>

            </div>
          </div>
          <div className="mt-6 bg-gray-800 p-6 rounded-xl shadow-lg border borde-gray-700 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">
                  Este Mes
                </p>
                <p className="text-2xl font-bold">
                  {dashboardData.facturasEsteMes}
                </p>
              </div>
              <div className="bg-green-600 p-3 rounded-lg">
                <Clock className='h-6 w-6 text-white' />
              </div>
            </div>
            <div className="mt-2 flex items-center">
              <TrendingUp className='h-4 w-4 text-green-400 mr-1' />
              <span className="text-sm text-green-400">12% este mes</span>
            </div>
          </div>
          <div className="mt-6 bg-gray-800 p-6 rounded-xl shadow-lg border borde-gray-700 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm  text-gray-400 ">
                  Clientes Activos
                </p>
                <p className="text-2xl font-bold">
                  {dashboardData.clientesActivos}
                </p>
              </div>
              <div className="bg-orange-600 p-3 rounded-lg">
                <Users className='h-6 w-6 text-white' />
              </div>
            </div>
            <div className="mt-2 flex items-center">
              <TrendingUp className='h-4 w-4 text-green-400 mr-1' />
              <span className='text-sm text-green-400'>5% este mes</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">
            Acciones Rapidas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className='flex items-center space-x-3 p-4 bg-blue-600/20 rounded-lg hover:bg-blue-600/30 transition-colors border border-blue-600/30'>
              <div className="bg-blue-600 p-2 rounded-lg">
                <Plus className='h-5 w-5 text-white' />
              </div>
              <span className='font-medium'>
                Nuevo Pedido
              </span>
            </button>
            <button className="flex items-center space-x-3 p-4 bg-green-600/20 rounded-lg hover:bg-green-600/30 transition-colors border border-green-600/30">
              <div className="bg-green-600 p-2 rounded-lg">
                <Eye className='h-5 w-5 text-white' />
              </div>
              <span className="font-medium">
                Ver Reportes
              </span>
            </button>
            <button className="flex items-center space-x-3 p-4 bg-purple-600/20 rounded-lg hover:bg-purple-600/30 transition-colors border-purple-600/30">
              <div className="bg-purple-600 p-2 rounded-lg">
                <Download className='h-5 w-5 text-white' />
              </div>
              <span className="font-medium ">
                Exportar Datos
              </span>
            </button>
          </div>
        </div>
{/* Recent Invoices */}
<div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Facturas Recientes</h2>
          <button className="text-blue-400 hover:text-blue-300 font-medium">Ver todas</button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-4 font-medium text-gray-400">Número</th>
                <th className="text-left py-3 px-4 font-medium text-gray-400">Cliente</th>
                <th className="text-left py-3 px-4 font-medium text-gray-400">Monto</th>
                <th className="text-left py-3 px-4 font-medium text-gray-400">Estado</th>
                <th className="text-left py-3 px-4 font-medium text-gray-400">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.recentInvoices.map((invoice, index) => (
                <tr key={index} className="border-b border-gray-700/50 hover:bg-gray-700/30">
                  <td className="py-3 px-4 font-medium">{invoice.id}</td>
                  <td className="py-3 px-4 text-gray-300">{invoice.nombre_receptor}</td>
                  <td className="py-3 px-4">${invoice.valor_total.toLocaleString()}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      invoice.status === 'Pagada' ? 'bg-green-600/20 text-green-400 border border-green-600/30' :
                      invoice.status === 'Pendiente' ? 'bg-yellow-600/20 text-yellow-400 border border-yellow-600/30' :
                      'bg-blue-600/20 text-blue-400 border border-blue-600/30'
                    }`}>
                      ✔
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-300">{invoice.fecha_facturacion}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
    </div>
  )
}

export default DasboardReal