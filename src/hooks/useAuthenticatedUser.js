import { useEffect, useState } from "react";
import { getAuthenticatedUser } from "../servicios/userService";

const useAuthenticatedUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token"); // Obtén el token del almacenamiento local

      if (!token) {
        setError("No se encontró un token de autenticación. Inicia sesión.");
        setLoading(false);
        return;
      }

      try {
        const userData = await getAuthenticatedUser(token);
        setUser(userData); // Guarda los datos del usuario
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading, error };
};

export default useAuthenticatedUser;