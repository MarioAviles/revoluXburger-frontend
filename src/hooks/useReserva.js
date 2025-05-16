import { useState } from 'react';
const useReserva = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const reservar = async (form) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const token = localStorage.getItem('token'); // <-- obtiene el token si existe
      const res = await fetch('https://revoluxburger-backend.onrender.com/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }) // añade la cabecera si hay token
        },
        body: JSON.stringify(form)
      });
      if (!res.ok) throw new Error('Error al realizar la reserva');
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { reservar, loading, error, success };
};

export default useReserva;