import { supabase } from "../../CreateClient";

export async function fetchBodegas() {
  const { data, error } = await supabase.from("bodegas").select("*");
  if (error) {
    throw new Error(error.message);
  }
  return data;
}
