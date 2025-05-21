// src/components/UploadImages.js
import React, { useState, useRef } from "react";
import { useUploadImage } from "../../../hooks/useUploadImage";
import "./ImagesSection.css";

const AddImage = ({ onUpload }) => {
  const [file, setFile] = useState(null);
  const [carpeta, setCarpeta] = useState("");
  const [uploadResult, setUploadResult] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);

  const { uploadImage, uploading, error } = useUploadImage();

  const handleUpload = async () => {
    if (!file || !carpeta) return;
    const url = await uploadImage(file, carpeta);
    if (url) {
      setUploadResult(url);
      setFile(null);
      setCarpeta("");
      if (onUpload) onUpload(url);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleClick = () => {
    inputRef.current.click();
  };

  return (
    <div className="upload-images-container text-center">
      <div
        className={`dropzone${dragActive ? " active" : ""}`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleChange}
        />
        {file ? (
          <div>
            <p>Imagen seleccionada: {file.name}</p>
            <img
              src={URL.createObjectURL(file)}
              alt="preview"
              style={{ maxWidth: "200px", marginTop: "10px" }}
            />
          </div>
        ) : (
          <p>Arrastra una imagen aquí o haz clic para seleccionar</p>
        )}
      </div>

      <div className="mb-3 mt-3">
        <label>Carpeta:</label>
        <select
          className="form-control"
          value={carpeta}
          onChange={(e) => setCarpeta(e.target.value)}
        >
          <option value="">Selecciona una carpeta</option>
          <option value="burgers">Burgers</option>
          <option value="entrantes">Entrantes</option>
          <option value="postres">Postres</option>
          <option value="bebidas">Bebidas</option>
        </select>
      </div>

      <button
        type="button"
        className="btn btn-success"
        disabled={!file || !carpeta || uploading}
        onClick={handleUpload}
      >
        {uploading ? "Subiendo..." : "Subir Imagen"}
      </button>

      {error && <div className="alert alert-danger mt-3">❌ {error}</div>}

      {uploadResult && (
        <div className="alert alert-success mt-3">
          Imagen subida correctamente:{" "}
          <a href={uploadResult} target="_blank" rel="noopener noreferrer">
            {uploadResult}
          </a>
          <br />
          <img
            src={uploadResult}
            alt="subida"
            style={{ maxWidth: "200px", marginTop: "10px" }}
          />
        </div>
      )}
    </div>
  );
};

export default AddImage;
