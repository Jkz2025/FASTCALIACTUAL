import { supabase } from "../../CreateClient";

export async function fetchUsers() {
  const { data, error } = await supabase.from("users").select("*");
  if (error) {
    throw new Error(error.message);
  }
  return data;
}
