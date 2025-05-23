import React, { useState, useEffect, useRef } from "react";
import { useUploadImage } from "../../../hooks/useUploadImage";
import { getAllCategorias } from "../../../servicios/categoriasService"; // Importar el servicio de categorías
import "./ImagesSection.css";

const AddImage = ({ onUpload }) => {
  const [file, setFile] = useState(null);
  const [carpeta, setCarpeta] = useState("");
  const [categorias, setCategorias] = useState([]); // Estado para las categorías
  const [uploadResult, setUploadResult] = useState("");
  const inputRef = useRef(null);

  const { uploadImage, uploading, error } = useUploadImage();

  // Obtener las categorías al cargar el componente
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const token = localStorage.getItem("token"); // Obtener el token si es necesario
        const data = await getAllCategorias(token);
        setCategorias(data); // Guardar las categorías en el estado
      } catch (err) {
        console.error("Error al obtener categorías:", err);
      }
    };

    fetchCategorias();
  }, []);

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

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleClick = () => {
    inputRef.current.click();
  };

  return (
    <div className="images-section">
      <h3 className="text-center mb-4 text-warning">Subir Imagen</h3>

      <div className="upload-images-container text-center w-50 align-items-center mx-auto">
        <div
          className="dropzone"
          onClick={handleClick}
          style={{
            border: "2px dashed #fcb300",
            padding: "20px",
            borderRadius: "8px",
            cursor: "pointer",
            backgroundColor: "#343a40",
            color: "#f8f9fa",
          }}
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
                style={{ maxWidth: "200px", marginTop: "10px", borderRadius: "8px" }}
              />
            </div>
          ) : (
            <p>Haz clic aquí para seleccionar una imagen</p>
          )}
        </div>

        <div className="mb-3 mt-3">
          <label className="form-label text-light">Carpeta:</label>
          <select
            className="form-control"
            value={carpeta}
            onChange={(e) => setCarpeta(e.target.value)}
            style={{
              backgroundColor: "#343a40",
              color: "#f8f9fa",
              border: "1px solid #fcb300",
            }}
          >
            <option value="">Selecciona una carpeta</option>
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.name}>
                {categoria.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          className="btn btn-warning"
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
              style={{ maxWidth: "200px", marginTop: "10px", borderRadius: "8px" }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AddImage;