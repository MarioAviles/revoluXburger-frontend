const API_URL = "https://revoluxburger-backend.onrender.com/images";

export const uploadService = {
  async uploadImage(file, folder) {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);

    const response = await fetch(`${API_URL}/upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      let errorMsg = "Error al subir la imagen";
      try {
        const errorData = await response.json();
        errorMsg = errorData.error || errorMsg;
      } catch (e) {
        // respuesta vacía o no JSON
      }
      throw new Error(errorMsg);
    }

    const data = await response.json();
    return data.url; // <- esperado según backend corregido
  },

  async getImageUrls(folder) {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/list?folder=${encodeURIComponent(folder)}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      let errorMsg = "Error al obtener las imágenes";
      try {
        const errorData = await response.json();
        errorMsg = errorData.error || errorMsg;
      } catch (e) {
        // respuesta vacía o no JSON
      }
      throw new Error(errorMsg);
    }

    return await response.json(); // backend ya devuelve lista de ImageDto
  },

  async deleteImage(folder, filename) {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/delete?folder=${encodeURIComponent(folder)}&filename=${encodeURIComponent(filename)}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      let errorMsg = "Error al borrar la imagen";
      try {
        const errorData = await response.json();
        errorMsg = errorData.error || errorMsg;
      } catch (e) {
        // respuesta vacía o no JSON
      }
      throw new Error(errorMsg);
    }
  }
};
