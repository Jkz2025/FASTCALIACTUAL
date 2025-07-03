import { useEffect } from "react";
import { fetchEmpleados } from "../Function/fetchEmpleados";


export function useFetchEmpleados(setEmpleados) {
  useEffect(() => {
    async function loadEmpleados() {
      try {
        const data = await fetchEmpleados();
        setEmpleados(data);
      } catch (error) {}
    }
    loadEmpleados()
  },  []);
}
