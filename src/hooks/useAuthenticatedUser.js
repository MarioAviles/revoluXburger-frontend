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
        // Si es un array y tiene al menos un usuario, usa el primero
        if (Array.isArray(userData) && userData.length > 0) {
          setUser(userData[0]);
        } else if (userData && typeof userData === "object") {
          setUser(userData);
        } else {
          setUser(null);
        }
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