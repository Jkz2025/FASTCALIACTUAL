import { Home, Users, Phone, LogIn, CircleDollarSign } from "lucide-react";
import Joel from "../../../assets/Img/Joel.jpg"


// Authenticated navigation items
export const authenticatedNavItems = [
    {
        title: "Facturacion y Pedidos",
        path: "/FacturacionYPedidos",
        subItems: [
            { name: "Envio Dian", path: "/FacturacionYPedidos/EnvioDian" },
            { name: "Pedidos", path: "/FacturacionYPedidos/Pedidos" },
            { name: "Facturacion", path: "/FacturacionYPedidos/Facturacion" },
            {
                name: "Impresion de Documentos",
                path: "/FacturacionYPedidos/ImpresionDocumentos",
            },
        ],
    },
    {
        title: "Gestion Inventarios",
        path: "GestionInventarios",
        subItems: [
            { name: "Inventario", path: "/GestionInventarios/Inventario" },
            { name: "Materiales", path: "/GestionInventarios/Materiales" },
            {
                name: "Listas De Precio",
                path: "/GestionInventarios/ListasDePrecio",
            },
            { name: "Bodega", path: "/GestionInventarios/Bodega" },
            { name: "Almacen Bodega", path: "/GestionInventarios/AlmacenBodega" },
        ],
    },
    {
        title: "Gestion Personas",
        path: "/GestionPersonas",
        subItems: [
            { name: "Clientes", path: "/GestionPersonas/Clientes" },
            { name: "Empleados", path: "/GestionPersonas/Empleados" },
            { name: "Proveedores", path: "/GestionPersonas/Proveedores" },
        ],
    },
];

// Public navigation items
export const publicNavItems = [

    {
        title: "Inicio",
        path: "/",
        icon: Home,
    },
    {
        title: "Contáctanos",
        path: "/Contactanos",
        icon: Phone,
    },
    {
        title: "Precios",
        path: "/precios",
        icon: CircleDollarSign,
    },
    {
        title: "¿Quiénes Somos?",
        path: "/QuienesSomos",
        icon: Users,
    },
    {
        title: "Iniciar Sesión",
        path: "/iniciar-sesion",
        icon: LogIn,

    },
];

export const planes = [
    {
        name: 'Basico',
        description: 'Perfecto para pequeñas empresas y emprendedores',
        monthlyPrice: 190000,
        yearlyPrice: 1900000,
        features: [
            'Hasta 50 facturas al mes',
            'Facturacion electronica DIAN',
            'Soporte por email',
            '1 Usuario',
            'Plantillas basicas',
            'Reportes basicos'
        ],
        color: 'border-gray-200',
        buttonColor: 'bg-gray-600 hover:bg-gray-700',
        popular: false
    },
    {
        name: 'Profesional',
        description: 'Ideal para empresas en crecimiento',
        monthlyPrice: 270000,
        yearlyPrice: 2700000,
        features: [
            'Hasta 200 facturas al mes',
            'Facturacion electronica Dian',
            'Soporte prioritario',
            '3 Usuarios',
            'Plantillas personalizadas',
            'Reportes Avanzados',
            'Integracion con bancos',
            'Nomina electronica',
        ],
        color: 'border-blue-500',
        buttonColor: 'bg-blue-600 hover:bg-blue-700',
        popular: true
    },
    {
        name: 'Empresarial',
        description: 'Para grandes empresas con alto volumen',
        monthlyPrice: 600000,
        yearlyPrice: 6000000,
        features: [
            'Facturas ilimitadas',
            'Facturacion electronica Dian',
            'Soporte 24/7',
            'Usuarios ilimitados',
            'Plantillas completamente personalizables',
            'Reportes empresariales',
            'Integracion Completa',
            'Nomina Electronica',
            'Api Dedicada',
            'Gerente de cuenta',
        ],
        color: 'border-purple-500',
        buttonColor: 'bg-purple-600 hover:bg-purple-700',
        popular: false
    }
]

export const equipo = [
    {
        nombre: 'Joel Vasquez',
        cargo: 'CEO y Fundador',
        descripcion: 'Mas de 3 años de experiencia en el desarrollo de software',
        imagen: Joel,
    },
    {
        nombre: 'Yony',
        cargo: 'Coordinador de Proyectos',
        descripcion: 'Mas de 7 años de experiencia en el campo',
        imagen: "Yony",
    },
]

export const valores = [
    {
        titulos: "Velocidad",
        descripcion: "Somos los mas rapidos del mercado en procesamiento de facturas",
        icono: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        )
    },

    {
        titulos: "Confiabilidad",
        descripcion: "99.9% de uptime y soporte 24/7 para tu tranquilidad",
        icono: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        )
    },
    {
        titulos: "Innovacion",
        descripcion: "Tecnologia de vanguardia adaptada al mercado colombiano",
        icono: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
        )
    },
    {
        titulos: "Innovacion",
        descripcion: "Tecnologia de vanguardia adaptada al mercado colombiano",
        icono: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
        )
    },
    {
        titulos: "Cercania",
        descripcion: "Somos caleños, entendemos las necesidades del mercado Local",
        icono: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 000-6.364 4.5 4.5 0 00-6.364 0L12 8.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
        )
    },

]

export const estadisticas = [
    { numero: "+5000", label: "Empresas confian en nosotros" },
    { numero: "99.9%", label: "Uptime garantizado" },
    { numero: "2025", label: "Fundacion" },
    { numero: "<1s", label: "TIempo de procesamiento" },
]
