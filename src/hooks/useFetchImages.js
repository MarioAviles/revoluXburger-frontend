// src/hooks/useFetchImages.js
import { useState } from "react";
import { uploadService } from "../servicios/imageService";

export const useFetchImages = () => {
  const [loading, setLoading] = useState(false);
  const [urls, setUrls] = useState([]);
  const [error, setError] = useState(null);

  const fetchImages = async (folder) => {
    setLoading(true);
    setError(null);
    try {
      const images = await uploadService.getImageUrls(folder);
      setUrls(images);
      return images;
    } catch (err) {
      setError(err.message || "Error al cargar imágenes");
      return [];
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    urls,
    error,
    fetchImages,
  };
};
