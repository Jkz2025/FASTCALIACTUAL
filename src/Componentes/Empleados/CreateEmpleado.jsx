


import React, { useState } from "react";
import { supabase } from "../../CreateClient";
import "../../App.css";
import ButtonFastCali from "../ButtonFastCali.jsx/ButtonFastCali";
import { useFetchCiudades } from "../Hooks/useFetchCiudad";
import { useFetchDepartamentos } from "../Hooks/useFetchDepartamentos";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { fetchEmpleados } from "../Function/fetchEmpleados";

const CreateEmpleado = () => {

    const [departamentos, setDepartamentos] = useState([])
    const [ciudades, setCiudades] = useState([])
    const navigate = useNavigate()

    const [empleado, setEmpleado] = useState({
        nombre: "",
        apellido: "",
        departamento: "",
        ciudad: "",
        celular: "",
        tipo_empleado: "",
        cargo: "",
        email_empleado: "",
        cedula: "",
        // Se agregó el estado para almacenar la obligación tributaria seleccionada
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useFetchDepartamentos(setDepartamentos)
    useFetchCiudades(setCiudades)

    function handleChange(e) {
        setEmpleado((prevFormData) => {
            return {
                ...prevFormData,
                [e.target.name]: e.target.value,
            };
        });
    }



    async function createEmpleado(e) {
        e.preventDefault();
        if (isSubmitting) return;
        alert('Se crea el Empleado satisfactoriamente')
        navigate('/GestionPersonas/Empleados')
        setIsSubmitting(true);
        // Insertar usuario en la base de datos
        const { error } = await supabase.from("empleados").insert([
            {
                nombre: empleado.nombre,
                apellido: empleado.apellido,
                departamento: empleado.departamento,
                ciudad: empleado.ciudad,
                celular: empleado.celular,
                tipo_empleado: empleado.tipo_empleado,
                cargo: empleado.cargo,
                email_empleado: empleado.email_empleado,
                cedula: empleado.cedula,

            },
        ]);

        if (error) {
            console.error("Error Creando Empleado:", error.message);
            setIsSubmitting(false);
            alert("Error Creando Empleado: " + error.message);
        } else {
            await fetchEmpleados();
            setIsSubmitting(false);
            setEmpleado({
                nombre: "",
                apellido: "",
                departamento: "",
                ciudad: "",
                celular: "",
                tipo_empleado: "",
                cargo: "",
                email_empleado: "",
                cedula: "",
            });
        }
    }




    return (
        <div className="max-w-4xl mx-auto my-8 mt-40">
            <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-black rounded-lg shadow-lg p-6">
                <h1 className="text-2xl font-bold text-white mb-4">Crear Empleado</h1>
                <form onSubmit={createEmpleado} className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                        {/*           ======================= Nombre Empleado - Apellido  - Cedula ======================= */}
                        <div className="mb-4">
                            <label
                                htmlFor="nombre"
                                className="block text-gray-700 font-semibold mb-2"
                            >
                                Nombre Empleado
                            </label>
                            <input
                                type="text"
                                id="nombre"
                                name="nombre"
                                onChange={handleChange}
                                className="p-2 rounded-lg bg-gray-800 text-white w-full sm:w-auto"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="apellido"
                                className="block text-gray-700 font-semibold mb-2"
                            >
                                Apellido
                            </label>
                            <input
                                type="text"
                                id="apellido"
                                name="apellido"
                                onChange={handleChange}
                                className="p-2 rounded-lg bg-gray-800 text-white w-full sm:w-auto"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="cedula"
                                className="block text-gray-700 font-semibold mb-2"
                            >
                                cedula
                            </label>
                            <input
                                type="number"
                                id="cedula"
                                name="cedula"
                                onChange={handleChange}
                                className="p-2 rounded-lg bg-gray-800 text-white w-full sm:w-auto"
                                required
                            />
                        </div>

                        {/*           ======================= Cedular - Tipo empleado  - Cargo ======================= */}
                        <div className="mb-4">
                            <label
                                htmlFor="celular"
                                className="block text-gray-700 font-semibold mb-2"
                            >
                                Celular
                            </label>
                            <input
                                type="number"
                                id="celular"
                                name="celular"
                                onChange={handleChange}
                                className="p-2 rounded-lg bg-gray-800 text-white w-full sm:w-auto"
                                required
                            />

                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="cargo"
                                className="block text-gray-700 font-semibold mb-2"
                            >
                                Cargo Empleado
                            </label>

                            <select
                                type="text"
                                id="cargo"
                                name="cargo"
                                value={empleado.cargo}
                                onChange={handleChange}
                                className="p-2 rounded-lg bg-gray-800 text-white w-full sm:w-auto"
                                required
                            >
                                <option value="" disabled selected>Selecciona un Tipo</option>
                                <option value="Analista">Analista</option>
                                <option value="Asesor Comercial">Asesor Comercial</option>
                                <option value="Gerente">Gerente Comercial</option>
                                <option value="Supervisor">Supervisor</option>
                                <option value="Transportista">Transportista</option>

                            </select>
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="tipo_empleado"
                                className="block text-gray-700 font-semibold mb-2"
                            >
                                Tipo Empleado
                            </label>

                            <select
                                type="text"
                                id="tipo_empleado"
                                name="tipo_empleado"
                                onChange={handleChange}
                                value={empleado.tipo_empleado}
                                className="p-2 rounded-lg bg-gray-800 text-white w-full sm:w-auto"
                                required
                            >
                                <option value="" disabled selected>Seleccione un Tipo</option>
                                <option value="Preventa">Preventa</option>
                                <option value="Autoventa">Autoventa</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="email_empleado"
                                className="block text-gray-700 font-semibold mb-2"
                            >
                                Correo Empleado
                            </label>

                            <input
                                type="email"
                                id="email_empleado"
                                name="email_empleado"
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
                                    <option value={empleado.departamento} className="text-gray-800" disabled selected>Seleccione un Departamento</option>
                                    {departamentos.map((departamento) => (
                                        <option className="text-gray-500" key={departamento.codigo_dane} value={departamento.nombre}  >
                                            {departamento.nombre} - {departamento.codigo_dane}
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
                                    <option value="" className="text-gray-800" disabled selected>Seleccione una Ciudad</option>
                                    {ciudades.map((ciudad) => (
                                        <option className="text-gray-500" value={ciudad.nombre} key={ciudad.codigo_dane}>
                                            {ciudad.nombre} - {ciudad.codigo_dane}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <ButtonFastCali text={`Crear Empleado`} />

                </form>

            </div>
            <Link to='/GestionPersonas/Proveedores'> <div className='py-4 flex justify-center'>
                <ButtonFastCali text='🔙' />
            </div>
            </Link>
        </div>

    );
};

export default CreateEmpleado;
