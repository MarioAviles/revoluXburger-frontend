const BASE_URL = "https://revoluxburger-backend.onrender.com/menu";

// Obtener todos los productos del menú (GET)
export const getAllMenuItems = async (token) => {
  const res = await fetch(BASE_URL, {
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
  if (!res.ok) throw new Error("Error al obtener productos del menú");
  return res.json();
};

// Obtener un producto del menú por ID (GET)
export const getMenuItem = async (id, token) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
  if (!res.ok) throw new Error("Error al obtener el producto");
  return res.json();
};

// Crear producto del menú (POST)
export const createMenuItem = async (data, token) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al crear producto");
  return res.json();
};

// Actualizar producto del menú (PUT)
export const updateMenuItem = async (id, data, token) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al actualizar producto");
  return res.json();
};

// Eliminar producto del menú (DELETE)
export const deleteMenuItem = async (id, token) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
  if (!res.ok) throw new Error("Error al eliminar producto");
};