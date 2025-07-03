import { useEffect } from "react"
import { fetchListasPrecioMateriales } from "../Function/fetchListasPrecioMateriales"

export function useFetchListasPrecioMateriales(setListasPrecioMateriales) {
    useEffect(() => {
        async function loadListasPrecio() {
            try {
                const data = await fetchListasPrecioMateriales();
                setListasPrecioMateriales(data);
            } catch (error) { }
        }
        loadListasPrecio()
    }, []);
}