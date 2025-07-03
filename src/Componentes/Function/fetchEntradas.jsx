import { supabase } from "../../CreateClient";

export async function fetchEntradas() {
  const { data, error } = await supabase.from("entradas_inventario").select("*");
  if (error) {
    throw new Error(error.message);
  }
  return data;
}
