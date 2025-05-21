// src/services/uploadService.js
const API_URL = "https://revoluxburger-backend.onrender.com/uploads";

export const uploadService = {
  async uploadImage(file, folder) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);

    const response = await fetch(`${API_URL}/image`, {
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
    const response = await fetch(`${API_URL}/images/urls?folder=${encodeURIComponent(folder)}`);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Error al obtener las imágenes");
    }

    const data = await response.json();
    return data.urls;
  },
};
