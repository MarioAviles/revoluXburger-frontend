import React, { useEffect, useState } from "react";
import { useFetchImages } from "../../../hooks/useFetchImages";

const ViewImages = () => {
  const [folder, setFolder] = useState("burgers");
  const { urls: images, error, loading, fetchImages } = useFetchImages();

  useEffect(() => {
    fetchImages(folder);
  }, [folder]);

  return (
    <div className="container mt-4">
      <h4 className="mb-3 text-center">Ver Imágenes</h4>

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

      {error && <div className="alert alert-danger">{error}</div>}
      {loading && <p className="text-center">Cargando imágenes...</p>}

      {images.length === 0 && !loading ? (
        <p className="text-center">No hay imágenes disponibles.</p>
      ) : (
        <ul className="list-group">
          {images.map((url, index) => (
            <li key={index} className="list-group-item d-flex align-items-center">
              <img
                src={url}
                alt={`imagen-${index}`}
                style={{ width: "50px", height: "50px", objectFit: "cover", marginRight: "10px" }}
              />
              <div>
                <p className="mb-0">
                  <strong>Nombre:</strong> {url.split("/").pop()}
                </p>
                <p className="mb-0">
                  <strong>URL:</strong>{" "}
                  <a href={url} target="_blank" rel="noopener noreferrer">
                    {url}
                  </a>
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewImages;
