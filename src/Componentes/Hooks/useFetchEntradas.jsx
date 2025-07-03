import { useEffect } from "react";
import { fetchEntradas } from "../Function/fetchEntradas";

export function useFetchEntradas(setEntradas) {
  useEffect(() => {
    async function loadEntradas() {
      try {
        const data = await fetchEntradas();
        setEntradas(data);
      } catch (error) {}
    }
    loadEntradas()   
  },  []);
}
