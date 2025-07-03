import { supabase } from "../../CreateClient";

export async function fetchEmpleados() {
  const { data, error } = await supabase.from("empleados").select("*");
  if (error) {
    throw new Error(error.message);
  }
  return data;
}
