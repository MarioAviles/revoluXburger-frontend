import { useState } from "react";
import { createReservation } from "../servicios/reservasService";

const useReserva = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const reservar = async (reservaData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await createReservation(reservaData);
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