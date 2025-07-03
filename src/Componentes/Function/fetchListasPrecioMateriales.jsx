import { supabase } from "../../CreateClient";

export async function fetchListasPrecioMateriales() {
  const { data, error } = await supabase.from("listas_precio_materiales").select("*");
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

