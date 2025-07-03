import { supabase } from "../../CreateClient";

export async function fetchEmpresa() {
  const { data, error } = await supabase.from("empresa").select("*");
  if (error) {
    throw new Error(error.message);
  }
  return data;
}
