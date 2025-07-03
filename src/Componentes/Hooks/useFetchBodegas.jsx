import { useEffect } from "react";
import { fetchBodegas } from "../Function/fetchBodegas";

export function useFetchBodegas(setCiudades) {
  useEffect(() => {
    async function loadCiudades() {
      try {
        const data = await fetchBodegas();
        setCiudades(data);
      } catch (error) { }
    }
    loadCiudades()
  }, []);
}
