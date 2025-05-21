// src/services/uploadService.js
const API_URL = "https://revoluxburger-backend.onrender.com/images";

export const uploadService = {
    async uploadImage(file, folder) {
        const token = localStorage.getItem("token");
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", folder);

        const response = await fetch(`${API_URL}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
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
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_URL}/urls?folder=${encodeURIComponent(folder)}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || "Error al obtener las imágenes");
        }

        const data = await response.json();
        return data.urls;
    },

    async deleteImage(publicId) {
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_URL}?publicId=${encodeURIComponent(publicId)}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || "Error al borrar la imagen");
        }
    }
};
