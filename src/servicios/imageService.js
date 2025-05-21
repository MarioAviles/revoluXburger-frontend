// src/services/uploadService.js
const API_URL = "https://revoluxburger-backend.onrender.com/images";

export const uploadService = {
  async uploadImage(file, folder) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);

    const response = await fetch(`${API_URL}`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Error al subir la imagen");
    }

    const data = await response.json();
    return data.url;
  },

  async getImageUrls(folder) {
    const response = await fetch(`${API_URL}/urls?folder=${encodeURIComponent(folder)}`);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Error al obtener las imágenes");
    }

    const data = await response.json();
    return data.urls;
  },

  async deleteImage(publicId) {
    const response = await fetch(`${API_URL}?publicId=${encodeURIComponent(publicId)}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Error al borrar la imagen");
    }
  }
};
