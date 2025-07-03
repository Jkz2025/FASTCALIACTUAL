import { supabase } from '../../CreateClient'

export async function fetchDetallesFacturas() {
    const { data, error } = await supabase.from("factura_detalle").select("*")
    if (error) {
        throw new Error(error.message)
    }
    return data;
}

