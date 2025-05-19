import React, { useState } from "react";

const DeleteImage = () => {
  const [selectedImage, setSelectedImage] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const handleDelete = async () => {
    try {
      // Aquí puedes enviar la solicitud al backend para eliminar la imagen
      setMensaje("Imagen eliminada correctamente");
    } catch (err) {
      setError("Error al eliminar la imagen");
    }
  };

  return (
    <div>
      <h4>Eliminar Imagen</h4>
      <div className="mb-3">
        <label>Selecciona Imagen</label>
        <select
          className="form-control"
          value={selectedImage}
          onChange={(e) => setSelectedImage(e.target.value)}
        >
          <option value="">Selecciona una imagen</option>
          {/* Aquí puedes mapear las imágenes disponibles */}
          <option value="imagen1">Imagen 1</option>
          <option value="imagen2">Imagen 2</option>
        </select>
      </div>
      <button className="btn btn-danger w-100" onClick={handleDelete}>
        Eliminar Imagen
      </button>
      {mensaje && <div className="alert alert-success mt-3">{mensaje}</div>}
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </div>
  );
};

export default DeleteImage;