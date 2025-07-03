import { useEffect } from "react";
import { fetchMoneda } from "../Function/fetchMonedas";

export function useFetchMoneda(setMonedas) {
    useEffect(() => {
        async function loadMonedas() {
            try {
                const data = await fetchMoneda();
                setMonedas(data);
            } catch (error) { }
        }
        loadMonedas()
    }, []);
}
