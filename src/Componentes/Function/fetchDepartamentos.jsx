import { supabase } from "../../CreateClient";

export async function fetchDepartamentos() {
  const { data, error } = await supabase.from("departamentos").select("*");
  if (error) {
    throw new Error(error.message);
  }
  return data;
}
