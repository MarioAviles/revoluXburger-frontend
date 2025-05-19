import React, { useState } from "react";

const EditImage = () => {
  const [selectedImage, setSelectedImage] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const handleEdit = async () => {
    try {
      // Aquí puedes enviar la nueva URL al backend para actualizar la imagen
      setMensaje("Imagen editada correctamente");
    } catch (err) {
      setError("Error al editar la imagen");
    }
  };

  return (
    <div>
      <h4>Editar Imagen</h4>
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
      <div className="mb-3">
        <label>Nueva URL</label>
        <input
          type="text"
          className="form-control"
          value={newUrl}
          onChange={(e) => setNewUrl(e.target.value)}
        />
      </div>
      <button className="btn btn-primary w-100" onClick={handleEdit}>
        Editar Imagen
      </button>
      {mensaje && <div className="alert alert-success mt-3">{mensaje}</div>}
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </div>
  );
};

export default EditImage;