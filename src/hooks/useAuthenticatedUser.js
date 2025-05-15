import { useEffect, useState } from "react";
import { getAuthenticatedUser } from "../servicios/userService";

const useAuthenticatedUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token"); // Obtén el token del almacenamiento local
      console.log("Token obtenido del localStorage:", token); // Verifica el token

      if (!token) {
        setError("No se encontró un token de autenticación. Inicia sesión.");
        setLoading(false);
        return;
      }

      try {
        const userData = await getAuthenticatedUser(token);
        console.log("Datos del usuario obtenidos:", userData); // Verifica los datos en la consola
        setUser(userData); // Guarda los datos del usuario en el estado
      } catch (err) {
        console.error("Error al obtener los datos del usuario:", err.message);
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