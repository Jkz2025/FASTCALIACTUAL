import { useEffect } from 'react';
import { fetchHistorialPedidos } from '../Function/fetchHistorialPedidos';

export function useFetchHistorialP(setPedidoDescripcion) {
    useEffect(() => {
      async function loadHistorial() {
        try {
          const data = await fetchHistorialPedidos();
          setPedidoDescripcion(data);
        } catch (error) {}
      }
      loadHistorial()   
    },  []);
  }
  
