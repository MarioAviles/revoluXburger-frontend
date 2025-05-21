import React, { useState } from "react";
import { useDeleteImage } from "../../../hooks/useDeleteImage";

const DeleteImage = ({ imageList = [], onDeleted }) => {
  const [selectedImage, setSelectedImage] = useState("");
  const [popup, setPopup] = useState(null);

  const { loading, error, deleteImage } = useDeleteImage();

  const handleDelete = async () => {
    if (!selectedImage) return;

    const success = await deleteImage(selectedImage);
    if (success) {
      setPopup("✅ Imagen eliminada correctamente");
      setSelectedImage("");
      onDeleted?.(); // si se pasa una función de actualización, la llama
    } else {
      setPopup("❌ Error al eliminar la imagen");
    }

    setTimeout(() => setPopup(null), 3000);
  };

  return (
    <div>
      <h4>Eliminar Imagen</h4>
      <div className="mb-3">
        <label htmlFor="imageSelect">Selecciona Imagen</label>
        <select
          id="imageSelect"
          className="form-control"
          value={selectedImage}
          onChange={(e) => setSelectedImage(e.target.value)}
        >
          <option value="">Selecciona una imagen</option>
          {imageList.map((url) => {
            // extraer el public_id de la URL
            const parts = url.split("/");
            const publicId = parts.slice(-2).join("/").replace(/\.[^/.]+$/, ""); // sin la extensión
            return (
              <option key={publicId} value={publicId}>
                {publicId}
              </option>
            );
          })}
        </select>
      </div>

      <button
        className="btn btn-danger w-100"
        onClick={handleDelete}
        disabled={loading || !selectedImage}
      >
        {loading ? "Eliminando..." : "Eliminar Imagen"}
      </button>

      {popup && <div className="custom-popup mt-2">{popup}</div>}
      {error && <div className="text-danger mt-1">{error}</div>}
    </div>
  );
};

export default DeleteImage;
