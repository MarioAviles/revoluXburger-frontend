import React, { useState } from "react";

const API_URL = "https://revoluxburger-backend.onrender.com/images";

export const useDeleteImage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteImage = async (folder, filename) => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${API_URL}/delete?folder=${encodeURIComponent(folder)}&filename=${encodeURIComponent(filename)}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const text = await res.text();
      let data = null;
      try {
        data = text ? JSON.parse(text) : null;
      } catch {}

      if (!res.ok) {
        throw new Error(data?.error || "Error al eliminar la imagen");
      }

      setLoading(false);
      return true;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      return false;
    }
  };

  return { loading, error, deleteImage };
};
