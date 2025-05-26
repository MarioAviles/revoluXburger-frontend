const BASE_URL = "https://revoluxburger-backend.onrender.com/auth";

export const login = async (username, password) => {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    throw new Error("Error al iniciar sesión");
  }

  return res.json(); // { token: "..." }
};

export const register = async ({ username, password, email, points = 0, role = "USER" }) => {
  const res = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password, email, points, role }),
  });

  if (!res.ok) {
    throw new Error("Error al registrar el usuario");
  }
};

// CRUD de usuarios (requieren token porque son privadas)
export const getAllUsers = async (token) => {
  const res = await fetch(BASE_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Error al obtener usuarios");
  return res.json();
};

export const getAuthenticatedUser = async (token) => {
  const res = await fetch(`${BASE_URL}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`, // Envía el token en el encabezado
      "Content-Type": "application/json",
    },
  });

  

  try {
    const data = await res.json(); // Convierte la respuesta a JSON
    console.log("Datos del usuario autenticado:", data); // Verifica los datos en la consola
    return data; // Devuelve los datos del usuario
  } catch (error) {
    throw new Error("Error al procesar la respuesta del servidor");
  }
};
export const deleteUser = async (id, token) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Error al eliminar usuario");
};

export const updateUser = async (id, data) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al actualizar usuario");
  return res.json();
};

export const sumarPuntosUsuario = async (id, puntos, token) => {
  const res = await fetch(`https://revoluxburger-backend.onrender.com/auth/${id}/points?pointsToAdd=${puntos}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
  if (!res.ok) throw new Error("Error al sumar puntos");
  return res.json();
};
