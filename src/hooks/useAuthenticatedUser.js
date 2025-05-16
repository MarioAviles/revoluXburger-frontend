import { useEffect, useState } from "react";
import { getAuthenticatedUser } from "../servicios/userService";

const useAuthenticatedUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }
      try {
        const userData = await getAuthenticatedUser(token);
        let usuario = userData;

        // Si es un array (admin), busca el usuario admin
        if (Array.isArray(userData)) {
          usuario = userData.find(user => user.role === "ADMIN") || userData[0];
        }

        setUser(usuario || null);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  return { user, loading };
};

export default useAuthenticatedUser;