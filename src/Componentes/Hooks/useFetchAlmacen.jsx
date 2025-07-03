import { useEffect } from "react";
import { fetchAlmacen } from "../Function/fetchAlmacen";

export function useFetchAlmacen(setAlmacen) {
  useEffect(() => {
    async function loadAlmacen() {
      try {
        const data = await fetchAlmacen();
        setAlmacen(data);
      } catch (error) {}
    }
    loadAlmacen()
  });
}
