import { useEffect } from "react";
import { fetchObligaciones } from "../Function/fetchObligaciones";

export function useFetchObligaciones(setObligaciones) {
  useEffect(() => {
    async function loadMateriales() {
      try {
        const data = await fetchObligaciones();
        setObligaciones(data);
      } catch (error) {}
    }
    loadMateriales()
  }, []);
}
