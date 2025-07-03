import { useEffect } from 'react';
import { fetchListasPrecio } from '../Function/fetchListasPrecio';

export function useFetchListasPrecio(setListasPrecio) {
    useEffect(() => {
      async function loadListas() {
        try {
          const data = await fetchListasPrecio();
          setListasPrecio(data);
        } catch (error) {}
      }
      loadListas()   
    },  []);
  }
  
