// src/hooks/useUploadImage.js
import { useState } from "react";
import { uploadService } from "../servicios/imageService";

export const useUploadImage = () => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const uploadImage = async (file, folder) => {
    setUploading(true);
    setError(null);
    try {
      const url = await uploadService.uploadImage(file, folder);
      return url;
    } catch (err) {
      setError(err.message || "Error al subir imagen");
      return null;
    } finally {
      setUploading(false);
    }
  };

  return {
    uploading,
    error,
    uploadImage,
  };
};
