import React, { useState, useEffect } from "react";
import { supabase } from "../../CreateClient";
import "../../App.css";
import { fetchUsers } from "../Function/fetchUsers";
import { useFetchObligaciones } from "../Hooks/useFetchObligaciones";
import ButtonFastCali from "../ButtonFastCali.jsx/ButtonFastCali";
import { useFetchCiudades } from "../Hooks/useFetchCiudad";
import { useFetchDepartamentos } from "../Hooks/useFetchDepartamentos";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Button from "../Dashboard/Components/Button";
import { useFetchListasPrecio } from "../Hooks/useFetchListasPrecio";
import { Plus } from 'lucide-react';

const CreateUser = () => {

  const [listas, setListasPrecios] = useState([])
  const [departamentos, setDepartamentos] = useState([])
  const [ciudades, setCiudades] = useState([])
  const [obligaciones, setObligaciones] = useState([]);
  const [selectedObligaciones, setSelectedObligaciones] = useState([]); // Estado para almacenar las obligaciones tributarias seleccionadas
  const [tipoCliente, setTipoDeCliente] = useState(false)
  const [numeroDocumentoReceptor, setNumeroDocumentoReceptor] = useState("")
  const [tipoDocumento, setTipoDeDocumento] = useState("CC")
  useFetchObligaciones(setObligaciones);
  useFetchDepartamentos(setDepartamentos)
  useFetchCiudades(setCiudades)
  useFetchListasPrecio(setListasPrecios)
  const navigate = useNavigate()

  const [user, setUser] = useState({
    name: "",
    apellido: "",
    razon_social: "",
    age: "",
    ciudad: "",
    departamento: "",
    nit: "",
    direccion: "",
    email: "",
    telefono: "",
    tipo_cliente: "",
    listas_precios: "",
    cedula: "",
    obligacion_tributaria: "obligaciones", // Se agregó el estado para almacenar la obligación tributaria seleccionada
    nombre_final: "",
    tipo_documento: tipoDocumento,
    fecha_creacion: "",
    numeroDocumentoReceptor: numeroDocumentoReceptor

  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user.tipo_cliente === "Juridica") {
      setTipoDeCliente(true)
      setTipoDeDocumento("NIT")
      setNumeroDocumentoReceptor(user.nit)

    } else {
      setTipoDeCliente(false)
      setTipoDeDocumento("CC")
      setNumeroDocumentoReceptor(user.cedula)
    }
  }, [user.tipo_cliente])


  function handleChange(e) {

    setUser((prevFormData) => {
      return {
        ...prevFormData,
        [e.target.name]: e.target.value,
      };
    });
  }



  async function createUser(e) {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    const nombreFinal = user.name + " " + user.apellido

    // Insertar usuario en la base de datos
    const { error } = await supabase.from("users").insert([
      {
        name: user.name,
        age: user.age,
        apellido: user.apellido,
        razon_social: user.razon_social,
        ciudad: user.ciudad,
        departamento: user.departamento,
        listas_precios: user.listas_precios,
        nit: user.nit,
        direccion: user.direccion,
        email: user.email,
        telefono: user.telefono,
        tipo_cliente: user.tipo_cliente,
        cedula: user.cedula,
        obligacion_tributaria: selectedObligaciones.toString(), // Insertar las obligaciones tributarias seleccionadas
        nombre_final: nombreFinal,
        tipo_documento: tipoDocumento,
        fecha_creacion: user.fecha_creacion,
      },

    ]);
    if (error) {
      console.error("Error creating user:", error.message);
      setIsSubmitting(false);
      alert("Error creating user: " + error.message);
    } else {
      await fetchUsers();
      setIsSubmitting(false);
      setUser({
        name: "",
        apellido: "",
        razon_social: "",
        age: "",
        ciudad: "",
        departamento: "",
        nit: "",
        direccion: "",
        email: "",
        telefono: "",
        tipo_cliente: "",
        cedula: "",
        listas_precios: "",
        obligacion_tributaria: "", // Se limpia el estado de la obligación tributaria seleccionada
      });
      alert('Se crea el cliente satisfactoriamente')
      setSelectedObligaciones([]); // Limpiar las obligaciones tributarias seleccionadas después de crear el usuario
    }
  }

  const handleClickAgregarObligaciones = () => {
    // Check that we're not adding the default "obligaciones" value
    if (user.obligacion_tributaria && user.obligacion_tributaria !== "obligaciones") {
      // Check if the obligation is already in the list to prevent duplicates
      if (!selectedObligaciones.includes(user.obligacion_tributaria)) {
        setSelectedObligaciones((prevSelected) => [
          ...prevSelected,
          user.obligacion_tributaria,
        ]);
      }
      // Reset the select to default value after adding
      setUser((prevFormData) => ({
        ...prevFormData,
        obligacion_tributaria: "obligaciones",
      }));
    }
  };

  const handleEliminarObligacion = (index) => {
    setSelectedObligaciones((prevSelected) =>
      prevSelected.filter((_, i) => i !== index)
    ); // Eliminar la obligación tributaria seleccionada del estado
  };

  return (
    <div className="min-h-screen p-8 bg-slate-900 mt-20">
      <div className="max-w-6xl mx-auto">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-slate-700">
          <h1 className="text-3xl font-bold text-white mb-8">Crear Cliente</h1>

          <form onSubmit={createUser} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {/* Tipo Cliente */}
              <div className="space-y-2">
                <label htmlFor="tipo_cliente" className="block text-gray-200 font-medium">
                  Tipo Cliente
                </label>
                <select
                  id="tipo_cliente"
                  name="tipo_cliente"
                  value={user.tipo_cliente}
                  onChange={handleChange}
                  className="w-full bg-slate-800 border border-slate-600 text-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                >
                  <option value="Cliente">Seleccione un Tipo Cliente</option>
                  <option value="Juridica">Jurídica</option>
                  <option value="Natural">Natural</option>
                </select>
              </div>

              {/* Nombre */}
              <div className="space-y-2">
                <label htmlFor="name" className="block text-gray-200 font-medium">
                  Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                  className="w-full bg-slate-800 border border-slate-600 text-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              {/* Apellido */}
              <div className="space-y-2">
                <label htmlFor="apellido" className="block text-gray-200 font-medium">
                  Apellido
                </label>
                <input
                  type="text"
                  id="apellido"
                  name="apellido"
                  value={user.apellido}
                  onChange={handleChange}
                  className="w-full bg-slate-800 border border-slate-600 text-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              {/* Edad */}
              <div className="space-y-2">
                <label htmlFor="age" className="block text-gray-200 font-medium">
                  Edad
                </label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={user.age}
                  onChange={handleChange}
                  className="w-full bg-slate-800 border border-slate-600 text-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              {/* Razón Social */}
              <div className="space-y-2">
                <label htmlFor="razon_social" className="block text-gray-200 font-medium">
                  Razón Social
                </label>
                <input
                  type="text"
                  id="razon_social"
                  name="razon_social"
                  value={user.razon_social}
                  onChange={handleChange}
                  className="w-full bg-slate-800 border border-slate-600 text-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              {/* Ciudad */}
              <div className="space-y-2">
                <label htmlFor="ciudad" className="block text-gray-200 font-medium">
                  Ciudad
                </label>
                <select
                  id="ciudad"
                  name="ciudad"
                  onChange={handleChange}
                  className="w-full bg-slate-800 border border-slate-600 text-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                >
                  <option value="">Seleccione una Ciudad</option>
                  {ciudades.map((ciudad) => (
                    <option value={ciudad.nombre} key={ciudad.codigo_dane}>
                      {ciudad.nombre} - {ciudad.codigo_dane}
                    </option>
                  ))}
                </select>
              </div>

              {/* Departamento */}
              <div className="space-y-2">
                <label htmlFor="departamento" className="block text-gray-200 font-medium">
                  Departamento
                </label>
                <select
                  id="departamento"
                  name="departamento"
                  onChange={handleChange}
                  className="w-full bg-slate-800 border border-slate-600 text-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                >
                  <option value="">Seleccione un departamento</option>
                  {departamentos.map((departamento) => (
                    <option value={departamento.nombre} key={departamento.codigo_dane}>
                      {departamento.nombre} - {departamento.codigo_dane}
                    </option>
                  ))}
                </select>
              </div>

              {/* NIT */}

              {tipoCliente ? (
                <div className="space-y-2">
                  <label htmlFor="nit" className="block text-gray-200 font-medium">
                    NIT
                  </label>
                  <input
                    type="number"
                    id="nit"
                    name="nit"
                    value={user.nit}
                    onChange={handleChange}
                    className="w-full bg-slate-800 border border-slate-600 text-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
              ) : null
              }


              {/* Cedula */}
              <div className="space-y-2">
                <label htmlFor="cedula" className="block text-gray-200 font-medium">
                  Cédula
                </label>
                <input
                  type="number"
                  id="cedula"
                  name="cedula"
                  value={user.cedula}
                  onChange={handleChange}
                  className="w-full bg-slate-800 border border-slate-600 text-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>



              {/* Dirección */}
              <div className="space-y-2">
                <label htmlFor="direccion" className="block text-gray-200 font-medium">
                  Dirección
                </label>
                <input
                  type="text"
                  id="direccion"
                  name="direccion"
                  value={user.direccion}
                  onChange={handleChange}
                  className="w-full bg-slate-800 border border-slate-600 text-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-gray-200 font-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  className="w-full bg-slate-800 border border-slate-600 text-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              {/* Teléfono */}
              <div className="space-y-2">
                <label htmlFor="telefono" className="block text-gray-200 font-medium">
                  Teléfono
                </label>
                <input
                  type="number"
                  id="telefono"
                  name="telefono"
                  value={user.telefono}
                  onChange={handleChange}
                  className="w-full bg-slate-800 border border-slate-600 text-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              {/* Lista de Precios */}
              <div className="space-y-2">
                <label htmlFor="listas_precios" className="block text-gray-200 font-medium">
                  Lista de Precios
                </label>
                <select
                  id="listas_precios"
                  name="listas_precios"
                  onChange={handleChange}
                  className="w-full bg-slate-800 border border-slate-600 text-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                >
                  <option value="">Seleccione una lista</option>
                  {listas.map((lista) => (
                    <option value={lista.name} key={lista.name}>
                      {lista.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Obligaciones Tributarias */}
              <div className="space-y-2">
                <label htmlFor="obligacion_tributaria" className="block text-gray-200 font-medium">
                  Obligaciones Tributarias
                </label>

                <select
                  id="obligacion_tributaria"
                  name="obligacion_tributaria"
                  value={user.obligacion_tributaria}
                  onChange={handleChange}
                  className="w-full bg-slate-800 border border-slate-600 text-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                >
                  <option value="No">No</option>
                  <option value="Si">Sí</option>
                </select>


              </div>

              <div className="space-y-2">
                <label htmlFor="fecha_creacion" className="block text-gray-200 font-medium">
                  Fecha de Creacion
                </label>
                
                {/* Fecha de Creacion */}
                <input
                  type="date"
                  id="fecha_creacion"
                  name="fecha_creacion"
                  value={user.fecha_creacion}
                  onChange={handleChange}
                  className="flex-1 bg-slate-800 border border-slate-600 text-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-500 text-white py-3 rounded-lg shadow-lg mt-6 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              Crear Cliente
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default CreateUser;
