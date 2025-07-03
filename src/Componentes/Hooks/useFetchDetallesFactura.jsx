import { useEffect } from "react";
import { fetchDetallesFacturas } from "../Function/fetchDetallesFacturas";

export function useFetchDetallesFactura(setDetalleFacturas) {
    useEffect(() => {
        async function loadDetalles() {
            try {
                const data = await fetchDetallesFacturas();
                setDetalleFacturas(data);
            } catch (error) { }
        }
        loadDetalles()
    }, []);
}
