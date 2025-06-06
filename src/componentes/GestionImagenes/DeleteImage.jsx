import React, { useState, useEffect } from "react";
import { useFetchImages } from "../../../hooks/useFetchImages";
import { useDeleteImage } from "../../../hooks/useDeleteImage";

const DeleteImage = () => {
  const [folder, setFolder] = useState("burgers");
  const [selectedImage, setSelectedImage] = useState(null);
  const [popup, setPopup] = useState(null);

  const {
    urls: images,
    loading: loadingImages,
    error: errorImages,
    fetchImages,
  } = useFetchImages();
  const { loading: loadingDelete, error: errorDelete, deleteImage } = useDeleteImage();

  useEffect(() => {
    fetchImages(folder);
    setSelectedImage(null);
  }, [folder]);

  const handleDelete = async () => {
    if (!selectedImage) return;

    const success = await deleteImage(folder, selectedImage.name);
    if (success) {
      setPopup("✅ Imagen eliminada correctamente");
      setSelectedImage(null);
      fetchImages(folder); // recarga imágenes
    } else {
      setPopup("❌ Error al eliminar la imagen");
    }

    setTimeout(() => setPopup(null), 3000);
  };

  return (
    <div className="container mt-4">
      <h4 className="mb-3 text-center">Eliminar Imagen</h4>

      {/* Selector carpeta */}
      <div className="mb-3 text-center">
        <label htmlFor="folder" className="form-label">
          Carpeta:
        </label>
        <select
          id="folder"
          className="form-select w-auto d-inline-block mx-2"
          value={folder}
          onChange={(e) => setFolder(e.target.value)}
        >
          <option value="burgers">Burgers</option>
          <option value="entrantes">Entrantes</option>
          <option value="postres">Postres</option>
          <option value="bebidas">Bebidas</option>
        </select>
      </div>

      {/* Selector imagen */}
      <div className="mb-3">
        <label htmlFor="imageSelect">Selecciona Imagen</label>
        <select
          id="imageSelect"
          className="form-control"
          value={selectedImage ? selectedImage.name : ""}
          onChange={(e) => {
            const img = images.find((img) => img.name === e.target.value);
            setSelectedImage(img || null);
          }}
          disabled={loadingImages}
        >
          <option value="">Selecciona una imagen</option>
          {images.map((img) => (
            <option key={img.name} value={img.name}>
              {img.name}
            </option>
          ))}
        </select>
      </div>

      {/* Vista previa */}
      {selectedImage && (
        <div className="mb-3 text-center">
          <img
            src={selectedImage.url}
            alt={selectedImage.name}
            style={{ maxWidth: "200px", maxHeight: "200px", objectFit: "contain" }}
          />
          <div className="mt-2">{selectedImage.name}</div>
        </div>
      )}

      <button
        className="btn btn-danger w-100"
        onClick={handleDelete}
        disabled={loadingDelete || !selectedImage}
      >
        {loadingDelete ? "Eliminando..." : "Eliminar Imagen"}
      </button>

      {popup && <div className="alert alert-info mt-2 text-center">{popup}</div>}
      {errorDelete && <div className="text-danger mt-1 text-center">{errorDelete}</div>}
      {errorImages && <div className="text-danger mt-1 text-center">{errorImages}</div>}
    </div>
  );
};

export default DeleteImage;
