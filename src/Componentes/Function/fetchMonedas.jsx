import { supabase } from "../../CreateClient";

export async function fetchMoneda() {
  const { data, error } = await supabase.from("moneda").select("*");
  if (error) {
    throw new Error(error.message);
  }
  return data;
}
