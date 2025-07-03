import React, { useState } from "react";
import { supabase } from "../../CreateClient";
import "../../App.css";
import ButtonFastCali from "../ButtonFastCali.jsx/ButtonFastCali";
import { useFetchCiudades } from "../Hooks/useFetchCiudad";
import { useFetchDepartamentos } from "../Hooks/useFetchDepartamentos";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { fetchProveedores } from "../Function/fetchProveedores";

const CreateProveedor = () => {

    const [departamentos, setDepartamentos] = useState([])
    const [ciudades, setCiudades] = useState([])
    const navigate = useNavigate()
    useFetchDepartamentos(setDepartamentos)
    useFetchCiudades(setCiudades)


    const [proveedor, setProveedor] = useState({
        nombre_proveedor: "",
        razon_social: "",
        direccion: "",
        telefono: "",
        correo_proveedor: "",
        nit: "",
        ciudad: "",
        departamento: "",
        // Se agregó el estado para almacenar la obligación tributaria seleccionada
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    function handleChange(e) {
        setProveedor((prevFormData) => {
            return {
                ...prevFormData,
                [e.target.name]: e.target.value,
            };
        });
    }



    async function createProveedor(e) {
        e.preventDefault();
        if (isSubmitting) return;
        alert('Se crea el Proveedor satisfactoriamente')
        navigate('/GestionPersonas/Proveedores')
        setIsSubmitting(true);
        // Insertar usuario en la base de datos
        const { error } = await supabase.from("proveedores").insert([
            {
                nombre_proveedor: proveedor.nombre_proveedor,
                razon_social: proveedor.razon_social,
                direccion: proveedor.direccion,
                telefono: proveedor.telefono,
                correo_proveedor: proveedor.correo_proveedor,
                nit: proveedor.nit,
                ciudad: proveedor.ciudad,
                departamento: proveedor.departamento,

            },
        ]);

        if (error) {
            console.error("Error Creando Proveedor:", error.message);
            setIsSubmitting(false);
            alert("Error Creando Proveedor: " + error.message);
        } else {
            await fetchProveedores();
            setIsSubmitting(false);
            setUser({
                nombre_proveedor: "",
                razon_social: "",
                direccion: "",
                telefono: "",
                correo_proveedor: "",
                nit: "",
                ciudad: "",
                departamento: "",
            });
            setSelectedObligaciones([]); // Limpiar las obligaciones tributarias seleccionadas después de crear el usuario
        }
    }




    return (
        <div className="max-w-4xl mx-auto my-8 mt-40">
            <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-black rounded-lg shadow-lg p-6">
                <h1 className="text-2xl font-bold text-white mb-4">Crear Proveedor</h1>
                <form onSubmit={createProveedor} className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                        {/*           ======================= Nombre Proveedor - Razon Social - Direccion ======================= */}
                        <div className="mb-4">
                            <label
                                htmlFor="nombre_proveedor"
                                className="block text-gray-700 font-semibold mb-2"
                            >
                                Nombre Proveedor
                            </label>
                            <input
                                type="text"
                                id="nombre_proveedor"
                                name="nombre_proveedor"
                                value={proveedor.nombre_proveedor}
                                onChange={handleChange}
                                className="p-2 rounded-lg bg-gray-800 text-white w-full sm:w-auto"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="razon_social"
                                className="block text-gray-700 font-semibold mb-2"
                            >
                                Razon Social
                            </label>
                            <input
                                type="text"
                                id="razon_social"
                                name="razon_social"
                                value={proveedor.razon_social}
                                onChange={handleChange}
                                className="p-2 rounded-lg bg-gray-800 text-white w-full sm:w-auto"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="direccion"
                                className="block text-gray-700 font-semibold mb-2"
                            >
                                Direccion
                            </label>
                            <input
                                type="text"
                                id="direccion"
                                name="direccion"
                                value={proveedor.direccion}
                                onChange={handleChange}
                                className="p-2 rounded-lg bg-gray-800 text-white w-full sm:w-auto"
                                required
                            />
                        </div>

                        {/*           ======================= Telefono - Correo  - Nit ======================= */}
                        <div className="mb-4">
                            <label
                                htmlFor="telefono"
                                className="block text-gray-700 font-semibold mb-2"
                            >
                                Telefono
                            </label>
                            <input
                                type="number"
                                id="telefono"
                                name="telefono"
                                value={proveedor.telefono}
                                onChange={handleChange}
                                className="p-2 rounded-lg bg-gray-800 text-white w-full sm:w-auto"
                                required
                            />

                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="correo_proveedor"
                                className="block text-gray-700 font-semibold mb-2"
                            >
                                Correo Proveedor
                            </label>

                            <input
                                type="email"
                                id="correo_proveedor"
                                name="correo_proveedor"
                                value={proveedor.correo_proveedor}
                                onChange={handleChange}
                                className="p-2 rounded-lg bg-gray-800 text-white w-full sm:w-auto"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="nit"
                                className="block text-gray-700 font-semibold mb-2"
                            >
                                Nit
                            </label>

                            <input
                                type="number"
                                id="nit"
                                name="nit"
                                value={proveedor.nit}
                                onChange={handleChange}
                                className="p-2 rounded-lg bg-gray-800 text-white w-full sm:w-auto"
                                required
                            />
                        </div>

                        {/*           ======================= Departamento - Ciudad  ======================= */}
                        <div className="flex flex-col sm:flex-row items-center gap-14">

                            <div className="mb-4    ]">
                                <label
                                    htmlFor="departamento"
                                    className="block text-gray-700 font-semibold mb-2"
                                >
                                    Departamento
                                </label>
                                <select
                                    type="text"
                                    id="departamento"
                                    name="departamento"
                                    onChange={handleChange}
                                    className="p-2 rounded-lg bg-gray-800 text-gray-400 w-full sm:w-auto"
                                    required
                                >
                                    <option value={proveedor.departamento} className="text-gray-800" >Seleccione un Departamento</option>
                                    {departamentos.map((departamento) => (
                                            <option className="text-gray-500" key={departamento.codigo_dane} value={departamento.nombre_departamento}  >
                                                {departamento.nombre_departamento} - {departamento.codigo_dane}
                                            </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="ciudad"
                                    className="block text-gray-700 font-semibold mb-2"
                                >
                                    Ciudad
                                </label>
                                <select
                                    type="text"
                                    id="ciudad"
                                    name="ciudad"
                                    onChange={handleChange}
                                    className="p-2 rounded-lg bg-gray-800 text-gray-400 w-full sm:w-auto"
                                    required
                                >
                                    <option value="" className="text-gray-800">Seleccione una Ciudad</option>
                                    {ciudades.map((ciudad) => (
                                        <option className="text-gray-500" value={ciudad.nombre_ciudad} key={ciudad.codigo_dane}>
                                            {ciudad.nombre_ciudad} - {ciudad.codigo_dane}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <ButtonFastCali text={`Crear Proveedor`} />

                </form>

            </div>
            <Link to='/GestionPersonas/Proveedores'> <div className='py-4 flex justify-center'>
                <ButtonFastCali text='🔙' />
            </div>
            </Link>
        </div>

    );
};

export default CreateProveedor;
