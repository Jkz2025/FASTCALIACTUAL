import { supabase } from "../../CreateClient";

export async function fetchAlmacen() {
  const { data, error } = await supabase.from("almacen_bodega").select("*");
  if (error) {
    throw new Error(error.message);
  }
  return data;
}
