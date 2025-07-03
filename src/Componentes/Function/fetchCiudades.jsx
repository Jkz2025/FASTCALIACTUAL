import { supabase } from "../../CreateClient";

export async function fetchCiudades() {
  const { data, error } = await supabase.from("ciudades").select("*");
  if (error) {
    throw new Error(error.message);
  }
  return data;
}
