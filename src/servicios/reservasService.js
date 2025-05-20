const BASE_URL = "https://revoluxburger-backend.onrender.com/reservations";

// Crear reserva (POST)
export const createReservation = async (reservation, token) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(reservation),
  });
  if (!res.ok) throw new Error("Error al crear la reserva");
  return res.json();
};

// Obtener todas las reservas (GET)
export const getAllReservations = async (token) => {
  const res = await fetch(BASE_URL, {
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
  if (!res.ok) throw new Error("Error al obtener reservas");
  return res.json();
};

// Editar reserva (PUT)
export const updateReservation = async (id, data, token) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al actualizar reserva");
  return res.json();
};

// Eliminar reserva (DELETE)
export const deleteReservation = async (id, token) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
  if (!res.ok) throw new Error("Error al eliminar reserva");
};

// Obtener horas disponibles para una fecha (GET)
export const getAvailableTimes = async (date, token) => {
  const res = await fetch(
    `${BASE_URL}/available-times?date=${date}`,
    {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    }
  );
  if (!res.ok) throw new Error("Error al obtener horas disponibles");
  return res.json();
};
