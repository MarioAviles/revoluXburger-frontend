const BASE_URL = "https://revoluxburger-backend.onrender.com/reservations";

export const createReservation = async (reservation) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reservation),
  });
  if (!res.ok) throw new Error("Error al crear la reserva");
  return res.json();
};