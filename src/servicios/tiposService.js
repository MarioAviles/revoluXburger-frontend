const BASE_URL = "https://revoluxburger-backend.onrender.com/types";

// Obtener todos los tipos (GET)
export const getAllTipos = async (token) => {
  const res = await fetch(BASE_URL, {
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
  if (!res.ok) throw new Error("Error al obtener los tipos");
  return res.json();
};

// Obtener un tipo por ID (GET)
export const getTipo = async (id, token) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
  if (!res.ok) throw new Error("Error al obtener el tipo");
  return res.json();
};

// Crear un tipo (POST)
export const createTipo = async (data, token) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al crear el tipo");
  return res.json();
};

// Eliminar un tipo (DELETE)
export const deleteTipo = async (id, token) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
  if (!res.ok) throw new Error("Error al eliminar el tipo");
};