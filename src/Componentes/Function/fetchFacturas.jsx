import { supabase } from '../../CreateClient';

export async function fetchFacturas() {
  const { data, error } = await supabase.from("facturacion").select("*");
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export default fetchFacturas
