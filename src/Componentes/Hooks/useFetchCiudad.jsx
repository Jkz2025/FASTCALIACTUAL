import { useEffect } from "react";
import { fetchCiudades } from "../Function/fetchCiudades";


export function useFetchCiudades(setCiudades) {
  useEffect(() => {
    async function loadCiudades() {
      try {
        const data = await fetchCiudades();
        setCiudades(data);
      } catch (error) {}
    }
    loadCiudades()
  }, []);
}
