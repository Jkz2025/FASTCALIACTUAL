import { Zap, Shield, BarChart3 } from "lucide-react"

const DashboardGeneral = ({ onLogin }) => {
    return (

        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">

            {/* Home Section */}
            <section className="relative overflow-hidden pt-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="text-center">
                        <h1 className="text-5xl md:text-6xl font-bold mb-6">
                            Facturación electrónica
                            <span className="blck bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                                FastCali
                            </span>
                        </h1>
                        <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                            Gestiona tus facturas electronicas de forma facil, rapida y segura. Cumple con todas las normativas fiscales mientras ahorras tiempo y dinero.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button onClick={onLogin}
                                className="bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition-all hover::scale-105 text-lg font-semibold"
                            >
                                Comenzar Gratis
                            </button>
                            <button className="border-2 border-blue-600 text-blue-400 px-8 py-4 rounded-xl hover:bg-blue-600 hover:text-white transition-all text-lg font-semibold">
                                Ver Demo
                            </button>
                        </div>
                    </div>
                </div>

                {/* Animated Background Elements */}
                <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500 rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-500 rounded-full opacity-20 animate-pulse delay-1000"></div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-gray-900/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Todo lo que necesitas para facturar
                        </h2>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            Herramientas completas para gestionar tu facturacion electronica
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/30 p-8 rounded-2xl hover:shadow-2xl transition-all hover:scale-105 border border-blue-700/20">
                            <div className="bg-blue-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                                <Zap className="h-6 w-6 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">
                                Facturación Rapida
                            </h3>
                            <p className="text-gray-400">
                                Crea facturas en segundos con nuestras plantillas inteligentes y automatizacion avanzada.
                            </p>
                        </div>

                        <div className="bg-gradient-to-br from-green-900/30 to-green-800/30 p-8 rounded-2xl hover:shadow-2xl transition-all hover:scale-105 border border-green-700/20">
                            <div className="bg-green-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                                <Shield
                                    className="h-6 w-6 text-white" />
                            </div>

                            <h3 className="text-xl font-semibold mb-2">
                                100% Seguro
                            </h3>
                            <p className="text-gray-400">
                                Cumplimiento total con normativas fiscales y maxima seguridad en tus datos.
                            </p>
                        </div>


                        <div className="bg-gradient-to-br from-purple-900/30 to-purple-800/30 p-8 rounded-2xl hover:shadow-2xl transition-all hover:scale-105 border border-purple-700/20">
                            <div className="bg-purple-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                                <BarChart3 className="h-6 w-6 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">
                                Reportes Inteligentes
                            </h3>
                            <p className="text-gray-400">
                                Analiza tu negocio con reportes detallados y metricas en tiempo real.
                            </p>
                        </div>
                    </div>

                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-blue-900 to-purple-900">
                <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Listo para simplificar tu facturacion?
                    </h2>
                    <p className="text-xl text-blue-200 mb-8">
                        Unete a miles de empresas que ya confian en FastCali
                    </p>
                    <button onClick={onLogin} className="bg-white text-blue-900 px-8 py-4 rounded-xl hover:bg-gray-100 transition-all hover:scale-105 text-lg font-semibold">
                        Comenzar Ahora
                    </button>
                </div>
            </section>

        </div>
    )
}

export default DashboardGeneral