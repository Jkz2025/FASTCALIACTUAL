import { Home, Users, Phone, LogIn } from "lucide-react";


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
        path: "/contact",
        icon: Phone,
    },
    {
        title: "¿Quiénes Somos?",
        path: "/about",
        icon: Users,
    },
    {
        title: "Iniciar Sesión",
        path: "/iniciar-sesion",
        icon: LogIn,

    },
];
