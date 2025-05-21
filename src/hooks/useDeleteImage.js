// src/hooks/useDeleteImage.js
import { useState } from "react";
import { uploadService } from "../servicios/imageService";

export const useDeleteImage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteImage = async (publicId) => {
    setLoading(true);
    setError(null);
    try {
      await uploadService.deleteImage(publicId);
      return true;
    } catch (err) {
      setError(err.message || "Error al borrar la imagen");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    deleteImage,
  };
};
