import React, { useState } from "react";
import UploadImages from "../UploadImages/UploadImages";

const AddImage = () => {
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const handleImageUpload = async (url) => {
    try {
      // Aquí puedes enviar la URL al backend si es necesario
      setMensaje("Imagen añadida correctamente");
    } catch (err) {
      setError("Error al añadir la imagen");
    }
  };

  return (
    <div>
      <h4>Añadir Imagen</h4>
      <UploadImages onUpload={handleImageUpload} />
      {mensaje && <div className="alert alert-success mt-3">{mensaje}</div>}
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </div>
  );
};

export default AddImage;