import { supabase } from "../../CreateClient";

export async function fetchProveedores() {
  const { data, error } = await supabase.from("proveedores").select("*");
  if (error) {
    throw new Error(error.message);
  }
  return data;
}
