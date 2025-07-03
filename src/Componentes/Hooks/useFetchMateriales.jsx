import { useEffect } from "react";
import { fetchMateriales } from "../Function/fetchMateriales";

export function useFetchMateriales(setMateriales) {
  useEffect(() => {
    async function loadMateriales() {
      try {
        const data = await fetchMateriales();
        setMateriales(data);
      } catch (error) {}
    }
    loadMateriales();
  }, []);
}
