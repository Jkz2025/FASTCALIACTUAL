import { useState } from "react";
import { supabase } from "../../../CreateClient";

const Contactanos = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        empresa: '',
        telefono: '',
        mensaje: ''
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Aquí integrarías con tu backend/Supabase
            console.log('Enviando contacto:', formData);

            // Simular envío
            await new Promise(resolve => setTimeout(resolve, 1000));
            const { data, error} = await supabase
            .from('contactanos')
            .insert([formData])
            if (error){
                console.error('Se presentaron los siguientes errores en supabase', error)
            }
            setSuccess(true);
            setFormData({
                nombre: '',
                email: '',
                empresa: '',
                telefono: '',
                mensaje: ''
            });
        } catch (error) {
            console.error('Error enviando mensaje:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen  py-12 px-4 mt-20">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-gray-10 mb-4">
                        Contáctanos
                    </h1>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        ¿Tienes preguntas sobre Fast Cali? Estamos aquí para ayudarte.
                        Contáctanos y te responderemos lo más rápido posible.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Formulario de contacto */}
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                            Envíanos un mensaje
                        </h2>

                        {success && (
                            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                                <p className="text-green-800">
                                    ¡Mensaje enviado exitosamente! Te contactaremos pronto.
                                </p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Nombre completo *
                                    </label>
                                    <input
                                        type="text"
                                        name="nombre"
                                        value={formData.nombre}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                                        placeholder="Tu nombre"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent  text-black"
                                        placeholder="tu@email.com"
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Empresa
                                    </label>
                                    <input
                                        type="text"
                                        name="empresa"
                                        value={formData.empresa}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent  text-black"
                                        placeholder="Nombre de tu empresa"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Teléfono
                                    </label>
                                    <input
                                        type="tel"
                                        name="telefono"
                                        value={formData.telefono}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent  text-black"
                                        placeholder="+57 300 123 4567"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Mensaje *
                                </label>
                                <textarea
                                    name="mensaje"
                                    value={formData.mensaje}
                                    onChange={handleChange}
                                    required
                                    rows={6}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent  text-black"
                                    placeholder="Cuéntanos cómo podemos ayudarte..."
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Enviando...' : 'Enviar mensaje'}
                            </button>
                        </form>
                    </div>

                    {/* Información de contacto */}
                    <div className="space-y-8">
                        <div className="bg-white rounded-2xl shadow-xl p-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                                Información de contacto
                            </h2>

                            <div className="space-y-6">
                                <div className="flex items-start space-x-4">
                                    <div className="bg-blue-100 p-3 rounded-lg">
                                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">Dirección</h3>
                                        <p className="text-gray-600">Cali, Valle del Cauca<br />Colombia</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="bg-blue-100 p-3 rounded-lg">
                                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">Email</h3>
                                        <p className="text-gray-600">contacto@fastcali.com<br />soporte@fastcali.com</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="bg-blue-100 p-3 rounded-lg">
                                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">Teléfono</h3>
                                        <p className="text-gray-600">+57 304 486 3286<br />+57 315 753 3753</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="bg-blue-100 p-3 rounded-lg">
                                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">Horario</h3>
                                        <p className="text-gray-600">Lunes a Viernes: 8:00 AM - 6:00 PM<br />Sábados: 9:00 AM - 2:00 PM</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Soporte rápido */}
                        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
                            <h3 className="text-xl font-semibold mb-4">¿Necesitas ayuda inmediata?</h3>
                            <p className="mb-6">Nuestro equipo de soporte está disponible para resolver tus dudas al instante.</p>
                            <div className="space-y-3">
                                <button className="w-full bg-white text-blue-600 py-2 px-4 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                                    Chat en vivo
                                </button>
                                <button className="w-full border border-white text-white py-2 px-4 rounded-lg font-medium hover:bg-white hover:text-blue-600 transition-colors">
                                    Llamar ahora
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contactanos;