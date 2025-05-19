import React, { useState, useEffect } from "react";

const ViewImages = () => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchImages = async () => {
      try {
        // Aquí puedes hacer una solicitud al backend para obtener las imágenes
        const response = await fetch("https://revoluxburger-backend.onrender.com/images/");
        const data = await response.json();
        setImages(data);
      } catch (err) {
        setError("Error al cargar las imágenes");
      }
    };

    fetchImages();
  }, []);

  return (
    <div>
      <h4>Ver Imágenes</h4>
      {error && <div className="alert alert-danger">{error}</div>}
      {images.length === 0 ? (
        <p>No hay imágenes disponibles.</p>
      ) : (
        <ul className="list-group">
          {images.map((image, index) => (
            <li key={index} className="list-group-item d-flex align-items-center">
              <img
                src={image.url}
                alt={image.name}
                style={{ width: "50px", height: "50px", objectFit: "cover", marginRight: "10px" }}
              />
              <div>
                <p className="mb-0"><strong>Nombre:</strong> {image.name}</p>
                <p className="mb-0"><strong>URL:</strong> <a href={image.url} target="_blank" rel="noopener noreferrer">{image.url}</a></p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewImages;