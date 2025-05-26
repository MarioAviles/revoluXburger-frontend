import { useState, useEffect } from "react";
import { getAuthenticatedUser } from "../servicios/userService";

const useUserData = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setUser(null);
        return;
      }
      try {
        const data = await getAuthenticatedUser(token);
        // Si data es un array, coge el primer usuario
        if (Array.isArray(data) && data.length > 0) {
          setUser(data[0]);
        } else {
          setUser(data);
        }
      } catch (err) {
        setError("No se pudo obtener el usuario");
        setUser(null);
      }
    };

    fetchUserData();
  }, []);

  return { user, error };
};

export default useUserData;