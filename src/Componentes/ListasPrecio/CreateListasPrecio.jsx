import React, { useState } from "react";
import { supabase } from "../../CreateClient";
import "../../App.css";
import Button from "../Dashboard/Components/Button";
import { Link, useNavigate } from "react-router-dom";
import ButtonFastCali from "../ButtonFastCali.jsx/ButtonFastCali";
import { useFetchMoneda } from "../Hooks/useFetchMoneda";


const CreateListasPrecio = () => {

  const [moneda, setMoneda] = useState([])
  const [descuento, setDescuento] = useState()
  const [lista, setLista] = useState({
    name: "",
    descripcion: "",
    moneda: "COP",
    categoria: "",
    descuento: descuento,
  });
  const [isSubmitting, setIsSubmitting] = useState(false); // Definición de isSubmitting

  useFetchMoneda(setMoneda)
  const navigate = useNavigate()

  function handleChange(e) {
    setLista((prevFormData) => {
      return {
        ...prevFormData,
        [e.target.name]: e.target.value,
      };
    });
  }



  async function createListas(e) {
    e.preventDefault();
    if (isSubmitting) return;

    // Validación para el campo de nombre 
    if (!lista.name) {
      alert("Por favor, introduce un nombre para la lista.");
      return;
    } else if (!lista.descripcion) {
      alert("Por favor, introduce una descripcion para la lista.");
      return;
    } else if (!lista.moneda) {
      alert("Por favor, introduce una moneda para la lista.");
      return;
    } else if (!lista.categoria) {
      alert("Por favor, introduce una categoria para la lista.");
      return;
    } else if (lista.descuento < 0) {
setDescuento(0)
    }
    const { error } = await supabase.from("listas_precio").insert({
      name: lista.name,
      descripcion: lista.descripcion,
      moneda: lista.moneda,
      categoria: lista.categoria,
      descuento: lista.descuento
    });
    alert('Se crea la lista satisfactoriamente')
    navigate('/GestionInventarios/ListasDePrecio')
    if (error) {
      console.error("Error creating material:", error.message);
      setIsSubmitting(false);
      alert("Error creating material  : " + error.message);
    } else {
      const data = await fetchMateriales();
      setMateriales(data);
      setIsSubmitting(false);
      setMaterial({
        name: "",
        descripcion: '',
        moneda: "COP",
        categoria: "",
        descuento: ""
      });

    }
  }

  return (
    <div className="max-w-4xl mx-auto my-8 mt-40">
      <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-black rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-white mb-4">Crear Lista De Precios</h1>
        <form onSubmit={createListas} className="space-y-4">
          <input
            type="text"
            placeholder="Nombre"
            name="name"
            onChange={handleChange}
            value={lista.name}
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-300"
          />
          <input
            type="text"
            placeholder="descripcion"
            name="descripcion"
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-300"
          />
          <select
            id="moneda"
            name="moneda"
            onChange={handleChange}
            type="text"
            className="p-2 rounded-lg bg-gray-800 text-gray-400 w-[100px] sm:w-auto"
            required
          >
            <option disabled selected>Selecciona una moneda</option>
              <option key="moneda" value="COP">COP</option>
          </select>

          <input
            type="text"
            placeholder="categoria"
            name="categoria"
            onChange={handleChange}
            value={lista.categoria}
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-300"
          />
          <input
            type="number"
            placeholder="Porcentaje Descuento"
            name="descuento"
            onChange={handleChange}
            value={lista.descuento}
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-300"
          />
          <ButtonFastCali text='Crear Lista' />
        </form>
      </div>
      <Link to='/GestionInventarios/Materiales'> <div className='py-4 flex justify-center'>
        <Button text='🔙' />
      </div>
      </Link>
    </div>
  );
};

export default CreateListasPrecio;
