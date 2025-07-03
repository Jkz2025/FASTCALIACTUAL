import { supabase } from "../../CreateClient";

export async function fetchPedidos () {
  const {data, error} = await supabase.from('pedidos').select('*')
  if(error) {
    throw new Error (error.message);
  }
  return data;
}

export default fetchPedidos