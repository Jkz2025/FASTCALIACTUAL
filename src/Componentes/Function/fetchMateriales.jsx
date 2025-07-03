import { supabase } from "../../CreateClient";

export async function fetchMateriales() {
  const { data, error } = await supabase.from("materiales").select("*");
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

