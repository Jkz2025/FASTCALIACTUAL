import { supabase } from "../../CreateClient";

export async function fetchListasPrecio() {
  const { data, error } = await supabase.from("listas_precio").select("*");
  if (error) {
    throw new Error(error.message);
  }
  return data;
}