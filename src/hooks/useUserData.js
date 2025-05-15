import { useEffect, useState } from 'react';
import { getUserData } from '../servicios/getUserData';

const useUserData = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No se encontró un token de autenticación.');
        return;
      }

      try {
        const data = await getUserData(token);
        setUser(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUserData();
  }, []);

  return { user, error };
};

export default useUserData;