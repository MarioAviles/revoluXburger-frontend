const BASE_URL = "https://revoluxburger-backend.onrender.com/categories";

// Obtener todas las categorías (GET)
export const getAllCategorias = async (token) => {
  const res = await fetch(BASE_URL, {
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
  if (!res.ok) throw new Error("Error al obtener categorías");
  return res.json();
};

// Obtener una categoría por ID (GET)
export const getCategoria = async (id, token) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
  if (!res.ok) throw new Error("Error al obtener la categoría");
  return res.json();
};

// Crear una categoría (POST)
export const createCategoria = async (data, token) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al crear categoría");
  return res.json();
};

// Eliminar una categoría (DELETE)
export const deleteCategoria = async (id, token) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
  if (!res.ok) throw new Error("Error al eliminar categoría");
};