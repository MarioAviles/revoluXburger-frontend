import React, { useState } from "react";

const DeleteImage = () => {
  const [selectedImage, setSelectedImage] = useState("");
  const [popup, setPopup] = useState(null); // Popup personalizado

  const handleDelete = async () => {
    try {
      // Aquí puedes enviar la solicitud al backend para eliminar la imagen
      setPopup("Imagen eliminada correctamente");
    } catch (err) {
      setPopup("Error al eliminar la imagen");
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
      {popup && <div className="custom-popup">{popup}</div>}
    </div>
  );
};

export default DeleteImage;