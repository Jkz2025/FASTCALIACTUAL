import { useEffect } from "react";
import { fetchDepartamentos } from "../Function/fetchDepartamentos";

export function useFetchDepartamentos(setDepartamentos) {
  useEffect(() => {
    async function loadDepartamentos() {
      try {
        const data = await fetchDepartamentos();
        setDepartamentos(data);
      } catch (error) {}
    }
    loadDepartamentos()
  }, []);
}
