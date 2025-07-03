import React, { useState, useEffect } from "react";
import { supabase } from "../../CreateClient";
import "../../App.css";
import {fetchMateriales} from "../Function/fetchMateriales";
import { useFetchMateriales } from "../Hooks/useFetchMateriales";
import Button from "../Dashboard/Components/Button";
import { Link } from "react-router-dom";
import ButtonFastCali from "../ButtonFastCali.jsx/ButtonFastCali";
import { useFetchListasPrecio } from "../Hooks/useFetchListasPrecio"
import { useNavigate } from "react-router-dom";

const CreateMateriales = () => {
  const [materiales, setMateriales] = useState([]);
  const [listas, setListasPrecio] = useState([])
  const [codigoMaterial, setCodigoMaterial] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // Definición de isSubmitting
  const [material, setMaterial] = useState({
    name: "",
    categoria: "",
    costo: "",
    codigo_material: "",
  });
  const [lista_precio_material, setLista_Precio_Material] = useState({
    lista_precios: "",
    material_id: "",
    material_name: "",
    precio_venta: "",
    descuento: "",
    descuento_porcentaje: ""
  })
  useFetchListasPrecio(setListasPrecio)
    const navigate = useNavigate()

  useEffect(() => {
    const fetchLastCodigoMaterial = async () => {
      const { data, error } = await supabase
        .from("materiales")
        .select("codigo_material")
        .order("id", { ascending: false })
        .limit(1);

      if (error) {
        console.error("Error fetching last codigo_material:", error.message);
        return;
      }

      const lastCodigo = data.length > 0 ? data[0].codigo_material : "0";
      const nextCodigo = `${parseInt(lastCodigo) + 1}`;
      setCodigoMaterial(nextCodigo);
      setMaterial((prevMaterial) => ({ ...prevMaterial, codigo_material: nextCodigo }));
    };

    fetchLastCodigoMaterial();
  }, []);

 

  function handleListaPrecioChange(e) {
    const { value } = e.target;
    setLista_Precio_Material((prevFormData) => {
      const listaSelected = listas.find(l => l.id === parseInt(value, 10));

      if (listaSelected) {
        const descuento_porcentaje = listaSelected.descuento;
        const lista_precios = listaSelected.name;
        console.log(descuento_porcentaje)

        // Aquí actualizas el estado con los valores de la lista seleccionada
        return {
          ...prevFormData,
          lista_precios,
          descuento_porcentaje,
          precio_venta: '', // Estableces el precio de venta a 0 al cambiar la lista
          descuento: '', // Estableces el precio de venta a 0 al cambiar la lista
        };
      } else {
        console.error("Lista not found");
        return prevFormData; // Mantienes el estado previo si no se encuentra la lista
      }
    });
  }

  function handlePrecioVentaChange(e) {
    const { value } = e.target;
    setLista_Precio_Material((prevFormData) => {
      const precio_venta = parseInt(value)
      const descuento = precio_venta * lista_precio_material.descuento_porcentaje / 100
      return {
        ...prevFormData,
        precio_venta,
        descuento,
      };
    });
  };

  const handleChangeCodigo = (e) => {
    const { name, value } = e.target;
    setMaterial((prevMaterial) => ({
      ...prevMaterial,
      [name]: value,
    }));
  };

  function handleChange(e) {
    const { name, value } = e.target;
    setMaterial((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));


    // Calculamos el descuento si se ha seleccionado una lista y se ha ingresado el precio de venta
    if (name === "precio_venta" && material.descuento && parseFloat(material.descuento)) {
      const descuento = parseFloat(material.descuento);
      const precioVenta = parseFloat(value);
      const descuentoCalculado = precioVenta * (descuento / 100);
      setMaterial((prevFormData) => ({
        ...prevFormData,
        descuento: descuentoCalculado.toFixed(2) // Redondeamos a 2 decimales
      }));
    }
  }

  useFetchMateriales(setMateriales);

  async function createMaterial(e) {
    e.preventDefault();
    if (isSubmitting) return;

    // Validación para el campo de nombre
    if (!material.name) {
      alert("Por favor, introduce un nombre para el material.");
      return;
    }

    setIsSubmitting(true);

    // Crear el material en la tabla "materiales"
    const { data: materialData, error: materialError } = await supabase
      .from("materiales")
      .insert({
        codigo_material: material.codigo_material,
        name: material.name,
        categoria: material.categoria,
        costo: material.costo, 
      })
      .select();

    if (materialError) {
      console.error("Error creating material:", materialError.message);
      setIsSubmitting(false);
      alert("Error creating material: " + materialError.message);
      return;
    }

    const createdMaterial = materialData[0];
    // Crear la entrada en la tabla "listas_precio_materiales"
    const { error: listaError } = await supabase.from("listas_precio_materiales").insert({
      lista_precios: lista_precio_material.lista_precios,
      material_id: material.codigo_material,
      material_name: material.name,
      precio_venta: lista_precio_material.precio_venta,
      descuento: lista_precio_material.descuento,
      descuento_porcentaje: lista_precio_material.descuento_porcentaje,
    });
    alert(`Se Crea el material '${codigoMaterial}' satisfactoriamente`)
    navigate('/GestionInventarios/Materiales')
    if (listaError) {
      console.error("Error creating lista_precio_material:", listaError.message);
      setIsSubmitting(false);
      alert("Error creating lista_precio_material: " + listaError.message);
      return;
    }

    // Fetch updated materials
    const materials = await fetchMateriales();
    setMateriales(materials);

    setIsSubmitting(false);
    setMaterial({
      name: "",
      categoria: "",
      costo: "",
    });
    setLista_Precio_Material({
      lista_precios: "",
      material_id: "",
      material_name: "",
      precio_venta: "",
      descuento: "",
    });
  }

  return (
    <div className="max-w-4xl mx-auto my-8 mt-40">
      <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-black rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-white mb-4">Crear Material</h1>
        <form onSubmit={createMaterial} className="space-y-4">
        <input
            type="text"
            placeholder="Codigo"
            name="codigo_material"
            onChange={handleChangeCodigo}
            value={material.codigo_material}
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-300"
            
          />
            <input
            type="text"
            placeholder="Nombre"
            name="name"
            onChange={handleChange}
            value={material.name}
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-300"
          />
         
          <input
            type="text"
            placeholder="Categoria"
            name="categoria"
            onChange={handleChange}
            value={material.categoria}
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-300"
          />
          <input
            type="number"
            placeholder="Costo"
            name="costo"
            onChange={handleChange}
            value={material.costo}
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-300"
          />

          {listas && (
            <>
              <div className="flex items-center gap-2">
                <select
                  name="lista_precios"
                  onChange={handleListaPrecioChange}
                  className="p-2 rounded-lg bg-gray-800 text-white"
                  value={lista_precio_material.name}  // Asegúrate de que el valor del select sea el id
                >
                  <option value="" disabled selected>
                    Seleccione una lista
                  </option>
                  {listas.map((lista) => (
                    <option key={lista.id} value={lista.id}>
                      {lista.name} - %{lista.descuento}
                    </option>
                  ))}
                </select>

                <input
                  type="number"
                  placeholder="Precio Venta"
                  name="precio_venta"
                  onChange={handlePrecioVentaChange}
                  value={lista_precio_material.precio_venta}
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-300"
                />
                <input
                  type="text"
                  placeholder="Descuento"
                  name="descuento"
                  value={lista_precio_material.descuento}
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-300"
                  readOnly
                />
              </div>

            </>
          )}

          {!listas && (
            <input
              type="number"
              placeholder="Precio Venta"
              name="precio_venta"
              onChange={handlePrecioVentaChange}
              value={lista_precio_material.precio_venta}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-300"
            />
          )}

          <ButtonFastCali text="Crear Material" />
        </form>
      </div>
      <Link to="/GestionInventarios/Materiales">
        <div className="py-4 flex justify-center">
          <Button text="🔙" />
        </div>
      </Link>
    </div>
  );
};

export default CreateMateriales;
