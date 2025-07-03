import { useEffect } from "react";
import { fetchUsers } from "../Function/fetchUsers";

export function useFetchUsers(setUsers) {
  useEffect(() => {
    async function loadUsers() {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (error) {}
    }
    loadUsers()
  }, []);
}
