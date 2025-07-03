import React, { useState, useEffect } from "react";
import { supabase } from "../../CreateClient";
import "../../App.css";
import { fetchBodegas } from "../Function/fetchBodegas";
import { useFetchBodegas } from "../Hooks/useFetchBodegas";
import { Link, useNavigate } from "react-router-dom";
import Button from "../Dashboard/Components/Button";

const CreateBodega = () => {
  const [bodegas, setBodegas] = useState([]);

  const [bodega, setBodega] = useState({
    name: "",
    direccion: "",
    telefono: "",
    prefijo: "",
    consecutivo_uno: "",
    consecutivo_dos: "",
    fecha_inicio: "",
    fecha_fin: "",
    resolucion: "",
    clave_tecnica: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false); // Definición de isSubmitting
  const navigate = useNavigate()

  function handleChange(e) {
    setBodega((prevFormData) => {
      return {
        ...prevFormData,
        [e.target.name]: e.target.value,
      };
    });
  }

  useFetchBodegas(setBodegas);

  async function createBodega(e) {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    alert('Se crea la Bodega satisfactoriamente')
    navigate('/GestionInventarios/Bodega')  

    // Validación para el campo de nombre
    if (!bodega.name) {
      alert("Por favor, introduce un nombre para la bodega.");
      return;
    }
    const { error } = await supabase.from("bodegas").insert({
      name: bodega.name,
      direccion: bodega.direccion,
      telefono: bodega.telefono,
      prefijo: bodega.prefijo,
      consecutivo_uno: bodega.consecutivo_uno,
      consecutivo_dos: bodega.consecutivo_dos,
      consecutivo_actual: bodega.consecutivo_uno,
      fecha_inicio: bodega.fecha_inicio,
      fecha_fin: bodega.fecha_fin,
      resolucion: bodega.resolucion,
      clave_tecnica: bodega.clave_tecnica,
    });

    if (error) {
      console.error("Error creating bodega:", error.message);
      setIsSubmitting(false);
      alert("Error creating bodega  : " + error.message);
    } else {
      const data = await fetchBodegas();
      setBodegas(data);
      setIsSubmitting(false);
      setBodega({
        name: "",
        direccion: "",
        telefono: "",
        prefijo: "",
        consecutivo_uno: "",
        consecutivo_dos: "",
        fecha_inicio: "",
        fecha_fin: "",
        resolucion: "",
        clave_tecnica: "",
      });
    }
  }

  return (
    <div className="max-w-4xl mx-auto my-8 mt-40">
  <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-black rounded-lg shadow-lg p-6">
    
    <h1 className="text-2xl font-bold text-white mb-4">Crear Bodega</h1>
    <form onSubmit={createBodega} className="flex flex-col gap-4 justify-center">
      <div className="flex flex-col sm:flex-row items-center gap-2">
        <input
          type="text"
          placeholder="Name"
          name="name"
          onChange={handleChange}
          value={bodega.name}
          className="p-2 rounded-lg bg-gray-800 text-white w-full sm:w-auto"
        />
        <input
          type="text"
          placeholder="Direccion"
          name="direccion"
          onChange={handleChange}
          value={bodega.direccion}
          className="p-2 rounded-lg bg-gray-800 text-white w-full sm:w-auto"
        />
        <input
          type="text"
          placeholder="Telefono"
          name="telefono"
          onChange={handleChange}
          value={bodega.telefono}
          className="p-2 rounded-lg bg-gray-800 text-white w-full sm:w-auto"
        />
        <input
          type="text"
          placeholder="Departamento"
          name="departamento"
          onChange={handleChange}
          value={bodega.departamento}
          className="p-2 rounded-lg bg-gray-800 text-white w-full sm:w-auto"
        />
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-2">
        <input
          type="text"
          placeholder="NIT"
          name="nit"
          onChange={handleChange}
          value={bodega.nit}
          className="p-2 rounded-lg bg-gray-800 text-white w-full sm:w-auto"
        />
        <input
          type="text"
          placeholder="Prefijo"
          name="prefijo"
          onChange={handleChange}
          value={bodega.prefijo}
          className="p-2 rounded-lg bg-gray-800 text-white w-full sm:w-auto"
        />
        <input
          type="text"
          placeholder="Consecutivo Uno"
          name="consecutivo_uno"
          onChange={handleChange}
          value={bodega.consecutivo_uno}
          className="p-2 rounded-lg bg-gray-800 text-white w-full sm:w-auto"
        />
        <input
          type="text"
          placeholder="Consecutivo Dos"
          name="consecutivo_dos"
          onChange={handleChange}
          value={bodega.consecutivo_dos}
          className="p-2 rounded-lg bg-gray-800 text-white w-full sm:w-auto"
        />
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-2">
        <input
          type="date"
          placeholder="Fecha Inicio"
          name="fecha_inicio"
          onChange={handleChange}
          value={bodega.fecha_inicio}
          className="p-2 rounded-lg bg-gray-800 text-white w-full sm:w-auto"
        />
        <input
          type="date"
          placeholder="Fecha Fin"
          name="fecha_fin"
          onChange={handleChange}
          value={bodega.fecha_fin}
          className="p-2 rounded-lg bg-gray-800 text-white w-full sm:w-auto"
        />
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-2">
        <input
          type="text"
          placeholder="Resolucion"
          name="resolucion"
          onChange={handleChange}
          value={bodega.resolucion}
          className="p-2 rounded-lg bg-gray-800 text-white w-full sm:w-auto"
        />
        <input
          type="text"
          placeholder="Clave tecnica"
          name="clave_tecnica"
          onChange={handleChange}
          value={bodega.clave_tecnica}
          className="p-2 rounded-lg bg-gray-800 text-white w-full sm:w-auto"
        />
      </div>
      <div className="flex justify-center">
    <button
            type="submit"
            className="w-[300px] mt-5 bg-yellow-300 hover:bg-yellow-400 text-gray-900 font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300"
          >
            Crear Bodega
          </button>
  </div>
    </form>
   
  </div>
  <Link to='/GestionInventarios/Bodega'>
    <div className='py-4 flex justify-center'>
      <Button text='🔙' />
    </div>
  </Link>
</div>

  );
};


export default CreateBodega;

