import React, { useState } from "react";
import UploadImages from "../UploadImages/UploadImages";

const AddImage = () => {
  const [popup, setPopup] = useState(null); // Popup personalizado

  const handleImageUpload = async (url) => {
    try {
      // Aquí puedes enviar la URL al backend si es necesario
      setPopup("Imagen añadida correctamente");
    } catch (err) {
      setPopup("Error al añadir la imagen");
    }
  };

  return (
    <div>
      <h4>Añadir Imagen</h4>
      <UploadImages onUpload={handleImageUpload} />
      {popup && <div className="custom-popup">{popup}</div>}
    </div>
  );
};

export default AddImage;