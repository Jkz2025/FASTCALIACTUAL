import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import PBodegas from "./Componentes/Pantallas/P_Bodegas/PBodegas";
import PUsers from "./Componentes/Pantallas/P_Users/PUsers";
import PMateriales from "./Componentes/Pantallas/P_Materiales/PMateriales";
import PPedidos from "./Componentes/Pantallas/P_Pedidos/PPedidos";
import PEmpresa from "./Componentes/Pantallas/PEmpresa/PEmpresa";
import Home from "./Componentes/Home/Home";
import Dashboard from "./Componentes/Dashboard/Dashboard";
import Navbar from "./Componentes/Dashboard/Navbar/Navbar";
import styles from '../src/style';
import CreatePedidos from "./Componentes/Pedidos/CreatePedidos";
import LoginDashboard from "./Componentes/Login/Login";
import CreateMateriales from "./Componentes/Materiales/CreateMateriales";
import CreateBodega from "./Componentes/Bodega/CreateBodega";
import CreateUser from "./Componentes/Users/CreateUser";
import GestionInventarios from "./Componentes/ButtonFastCali.jsx/Modulos/GestionInventarios/GestionInventarios";
import PAlmacen from "./Componentes/Pantallas/PAlmacen/PAlmacen";
import IngresoInventario from "./Componentes/Inventario/IngresoInventario";
import PInventario from "./Componentes/Pantallas/PInventario/PInventario";
import PEmpleados from "./Componentes/Pantallas/PEmpleados/PEmpleados";
import PProveedores from "./Componentes/Pantallas/PProveedores/PProveedores";
import CreateProveedor from "./Componentes/Proveedores/CreateProveedor";
import CreateEmpleado from "./Componentes/Empleados/CreateEmpleado";
import PFacturacion from "./Componentes/Pantallas/PFacturacion/PFacturacion";
import PListas_Precio from "./Componentes/Pantallas/P_ListasPrecio/PListas_Precio";
import CreateListasPrecio from "./Componentes/ListasPrecio/CreateListasPrecio";
import EditPedido from "./Componentes/Pedidos/EditarPedidos";
import PPEnvioDian from "./Componentes/Pantallas/P_EnvioDian/PPEnvioDian";
import P_ImpresionFacturas from "./Componentes/Pantallas/P_ImpresionFacturas/P_ImpresionFacturas";
import InvoiceApp from "./Componentes/InvoiceApp/InvoiceApp";
import IniciarSesion from "./Componentes/IniciarSesion/IniciarSesion";

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <div className="flex bg-gradient-to-r from-slate-50 to-amber-300 w-full overflow-hidden fixed z-50">
          <div className={`${styles.paddingX} ${styles.flexCenter}`}>
            <div className={`${styles.boxWidth}`}>
              <Navbar />
            </div>
          </div>    
        </div>

        <Routes>
          <Route path="/" element={<LoginDashboard />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Empresa" element={<PEmpresa />} />
          <Route path='/FacturacionyPedidos/EnvioDian'  element={<PPEnvioDian />} />
          <Route path="/FacturacionyPedidos/Pedidos" element={<PPedidos />} />
          <Route path="/FacturacionyPedidos/CrearPedido" element={<CreatePedidos />} />
          <Route path="/FacturacionyPedidos/Pedidos/Editar/:id?" element={<EditPedido/>} />
          <Route path="/FacturacionyPedidos/ImpresionDocumentos" element={<P_ImpresionFacturas/>} />
          {/* Modulo Inventaios */}
          <Route path="/GestionInventarios" element={<GestionInventarios />} />
          <Route path="/GestionPersonas/CrearClientes" element={<CreateUser />} />
          <Route path="/GestionInventarios/Inventario" element={<PInventario />} />
          <Route path="/GestionInventarios/IngresoInventario" element={<IngresoInventario />} />
          <Route path="/GestionInventarios/Materiales" element={<PMateriales />} />
          <Route path="/GestionInventarios/CrearMaterial" element={<CreateMateriales />} />
          <Route path="/GestionInventarios/ListasDePrecio" element={<PListas_Precio />} />
          <Route path="/GestionInventarios/CreateListasPrecio" element={<CreateListasPrecio />} />
          <Route path="/GestionInventarios/Bodega" element={<PBodegas />} />
          <Route path='/GestionInventarios/CrearBodega' element={<CreateBodega />} />
          <Route path='/GestionInventarios/AlmacenBodega' element={<PAlmacen />} />
          <Route path="/LoginDashboard" element={<LoginDashboard />} />
          <Route path="/GestionPersonas/Clientes" element={<PUsers />} />
          <Route path="/GestionPersonas/CrearClientes" element={<CreateUser />} />
          <Route path="/GestionPersonas/Empleados" element={<PEmpleados />} />
          <Route path="/GestionPersonas/CrearEmpleados" element={<CreateEmpleado />} />
          <Route path="/GestionPersonas/Proveedores" element={<PProveedores />} />
          <Route path="/GestionPersonas/CrearProveedores" element={<CreateProveedor />} />
          <Route path="/FacturacionyPedidos/Facturacion" element={<PFacturacion />} />
          <Route path="/InvoiceApp" element={<InvoiceApp />} />
          <Route index element={<Home />} />
          <Route path="/iniciar-sesion" element={<IniciarSesion />} />
          {/* Agrega más rutas según sea necesario */}
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
