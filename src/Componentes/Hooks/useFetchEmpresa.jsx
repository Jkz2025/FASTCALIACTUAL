import { useEffect } from "react";
import {fetchEmpresa} from "../Function/fetchEmpresa";

export function useFetchEmpresas(setEmpresa) {
  useEffect(() => {
    async function loadEmpresa() {
      try {
        const data = await fetchEmpresa();
        setEmpresa(data);
      } catch (error) {}
    }
    loadEmpresa()
  },  []);
}
