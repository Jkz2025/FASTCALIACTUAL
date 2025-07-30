import { useState } from "react"
import { planes } from "../../Dashboard/Navbar/constantes"

const Precios = () => {

    const [billingType, setBillingType] = useState('monthly')


    const formatPrice = (price) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimunFractionDigits: 0
        }).format(price)
    };

    const getPrice = (plan) => {
        return billingType === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
    }

    const getSaving = (plan) => {
        const yearlyMonthly = plan.monthlyPrice * 12;
        const savings = yearlyMonthly - plan.yearlyPrice;
        return Math.round((savings / yearlyMonthly) * 100)
    }


    return (
        <div className="mt-20 min-h-screen bg-gray-900 py-12 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-white-900 mb-4">
                        Precios transparentes para tu negocio
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                        Elige el Plan que mejor se adapte a tu empresa. Todos incluyen facturacion electronica certificada por la DIAN y soporte especializado.
                    </p>
                    {/* Toggle de facturacion */}
                    <div className="flex items-center justify-center mb-12">
                        <div className="bg-white rounded-lg p-1 shadow-md">
                            <button
                                onClick={() => setBillingType('monthly')}
                                className={`px-6 py-2 rounded-md font-medium transition-colors 
                                         ${billingType === 'monthly' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:text-gray-900'}`}
                            >
                                Mensual
                            </button>
                            <button

                                onClick={() => setBillingType('yearly')}
                                className={`px-6 py-2 rounded-md font-medium transition-colors ${billingType === 'yearly' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:text-gray-900'
                                    } `}
                            >
                                Anual
                                <span className="ml-2 text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">
                                    Ahorra hasta 20%
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
                {/* Planes */}
                <div className="grid lg:grid-cols-3 gap-8 mb-16">
                    {planes.map((plan, index) => (
                        <div className={`relative bg-white rounded-2xl shadow-xl p-8 border-2 ${plan.color} ${plan.popular ? 'transform scale-105' : ''}`}>
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                    <span className="bg-blue-600 text-white py-2 rounded-full text-sm font-medium">
                                        Mas Popular
                                    </span>
                                </div>
                            )}

                            <div className="text-center mb-8">
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                    {plan.name}
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    {plan.description}
                                </p>
                                <div className="mb-4">
                                    <span className="text-4xl font-bold text-gray-900">
                                        {formatPrice(getPrice(plan))}
                                    </span>
                                    <span className="text-gray-600 ml-2">
                                        /{billingType === 'monthly' ? 'mes' : 'año'}
                                    </span>
                                </div>

                                {billingType === 'yearly' && (
                                    <div className="text-green-600 text-sm font-medium">
                                        Ahorras {getSaving(plan)}% vs. Pago mensual
                                    </div>
                                )}
                            </div>

                            <ul className="space-y-4 mb-8">
                                {plan.features.map((feature, featureIndex) => (
                                    <li className="flex items-start">
                                        <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-gray-700">
                                            {feature}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            <button className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-colors ${plan.buttonColor}`} >
                                Comenzar Ahora

                            </button>
                        </div>
                    ))}
                </div>

              {/* Características adicionales */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Todos los planes incluyen
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 p-4 rounded-lg mb-4 inline-block">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Certificación DIAN</h3>
              <p className="text-gray-600 text-sm">Cumplimiento total con la normativa colombiana</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 p-4 rounded-lg mb-4 inline-block">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Seguridad SSL</h3>
              <p className="text-gray-600 text-sm">Protección total de tus datos</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 p-4 rounded-lg mb-4 inline-block">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Backups automáticos</h3>
              <p className="text-gray-600 text-sm">Respaldo diario de tu información</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 p-4 rounded-lg mb-4 inline-block">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Velocidad garantizada</h3>
              <p className="text-gray-600 text-sm">Los más rápidos del mercado</p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Preguntas frecuentes
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">¿Puedo cambiar de plan en cualquier momento?</h3>
              <p className="text-gray-600 text-sm mb-4">Sí, puedes actualizar o cambiar tu plan cuando lo necesites. Los cambios se reflejan inmediatamente.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">¿Qué métodos de pago aceptan?</h3>
              <p className="text-gray-600 text-sm mb-4">Aceptamos tarjetas de crédito, débito, transferencias bancarias y PSE.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">¿Hay periodo de prueba?</h3>
              <p className="text-gray-600 text-sm mb-4">Sí, ofrecemos 14 días gratuitos para que pruebes todas las funcionalidades.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">¿Incluye soporte técnico?</h3>
              <p className="text-gray-600 text-sm mb-4">Todos los planes incluyen soporte técnico especializado en facturación electrónica.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Precios;
