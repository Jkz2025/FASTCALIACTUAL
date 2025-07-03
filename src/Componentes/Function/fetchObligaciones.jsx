  import { supabase } from "../../CreateClient";

export async function fetchObligaciones() {
  const { data, error } = await supabase.from("all_obligaciones_tributarias").select("*");
  if (error) {
    throw new Error(error.message);
  }
  return data;
}
