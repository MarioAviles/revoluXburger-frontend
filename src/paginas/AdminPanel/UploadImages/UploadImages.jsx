import React, { useState, useRef } from "react";
import "./UploadImages.css";

const UploadImages = ({ onUpload }) => {
    const [file, setFile] = useState(null);
    const [category, setCategory] = useState("");
    const [uploadResult, setUploadResult] = useState("");
    const [dragActive, setDragActive] = useState(false);
    const inputRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file || !category) return;

        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", category);

        try {
            const response = await fetch("https://revoluxburger-backend.onrender.com/uploads/image", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) throw new Error("Error al subir la imagen");

            const result = await response.json();
            setUploadResult(result.url);
            setFile(null);
            setCategory("");
        } catch (error) {
            console.error(error);
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

    const handleUpload = async () => {
        if (!file || !category) return;

        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", category);

        try {
            const response = await fetch("https://revoluxburger-backend.onrender.com/uploads/image", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) throw new Error("Error al subir la imagen");

            const result = await response.json();
            setUploadResult(result.url);
            setFile(null);
            setCategory("");
            if (onUpload) {
                onUpload(result.url); // Notifica al padre la URL subida
            }
        } catch (error) {
            console.error(error);
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
                <label>Categoría:</label>
                <select
                    className="form-control"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                >
                    <option value="">Selecciona una categoría</option>
                    <option value="burgers">Burgers</option>
                    <option value="entrantes">Entrantes</option>
                    <option value="postres">Postres</option>
                    <option value="bebidas">Bebidas</option>
                </select>
            </div>
            <button
                type="button"
                className="btn btn-success"
                disabled={!file || !category}
                onClick={handleUpload}
            >
                Subir Imagen
            </button>
            {uploadResult && (
                <div className="alert alert-success mt-3">
                    Imagen subida correctamente: <a href={uploadResult} target="_blank" rel="noopener noreferrer">{uploadResult}</a>
                    <br />
                    <img src={uploadResult} alt="subida" style={{ maxWidth: "200px", marginTop: "10px" }} />
                </div>
            )}
        </div>
    );
};

export default UploadImages;