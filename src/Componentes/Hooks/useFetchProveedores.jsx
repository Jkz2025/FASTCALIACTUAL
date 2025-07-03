import { useEffect } from "react";
import { fetchProveedores } from "../Function/fetchProveedores";


export function useFetchProveedores(setProveedores) {
  useEffect(() => {
    async function loadProveedores() {
      try {
        const data = await fetchProveedores();
        setProveedores(data);
      } catch (error) {}
    }
    loadProveedores()
  },  []);
}
