import React, { useEffect, useState, useCallback } from "react";
import { useFetchImages } from "../../hooks/useFetchImages";
import useCategorias from "../../hooks/useCategorias";
import { uploadService } from "../../servicios/imageService"; // Importar el servicio
import PopUpConfirmacion from "../PopUpConfirmacion/PopUpConfirmacion"; // Importar el popup
import "./ImagesSection.css";
import AjaxLoader from "../AjaxLoader/AjaxLoader";
const ViewImages = () => {
  const [folder, setFolder] = useState(""); // Carpeta seleccionada
  const { urls: images, error, loading, fetchImages } = useFetchImages();
  const { categorias, loading: loadingCategorias } = useCategorias();
  const [deleting, setDeleting] = useState(false); // Estado para manejar la eliminación
  const [confirmImageUrl, setConfirmImageUrl] = useState(null); // Imagen a confirmar para eliminar
  const [popup, setPopup] = useState(null); // Mensaje de popup

  // Memoizar fetchImages
  const memorizedFetchImages = useCallback(fetchImages, []);

  useEffect(() => {
    if (folder) {
      memorizedFetchImages(folder); // Cargar imágenes de la carpeta seleccionada
    }
  }, [folder, memorizedFetchImages]);

  // Extraer el nombre del archivo de la URL
  const extractFilename = (url) => {
    return url.substring(url.lastIndexOf("/") + 1); // Extrae el nombre del archivo
  };

  const handleDelete = async (imageUrl) => {
    const filename = extractFilename(imageUrl); // Extraer el nombre del archivo
    setDeleting(true);
    try {
      await uploadService.deleteImage(folder, filename); // Llamar al servicio para eliminar la imagen
      setPopup("Imagen eliminada correctamente.");
      setConfirmImageUrl(null); // Cerrar el popup
      memorizedFetchImages(folder); // Recargar las imágenes de la carpeta
    } catch (error) {
      console.error("Error al eliminar la imagen:", error);
      setPopup("Hubo un error al eliminar la imagen.");
    } finally {
      setDeleting(false);
    }
  };

  if (loadingCategorias) return <div><AjaxLoader/></div>;

  return (
    <div className="images-section">
      <h3 className="text-center mb-4 text-warning">Gestión de Imágenes</h3>

      <div className="mb-4 text-center">
        <label htmlFor="folder" className="form-label text-light">
          Carpeta:
        </label>
        <select
          id="folder"
          className="form-select w-auto d-inline-block mx-2"
          value={folder}
          onChange={(e) => setFolder(e.target.value)}
        >
          <option value="">Selecciona una carpeta</option>
          <option value="categorias">Categorias</option>
          {categorias.map((cat) => (
            <option key={cat.id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}
      {loading && <AjaxLoader />}

      {images.length === 0 && !loading ? (
        <p className="text-center text-light">No hay imágenes disponibles en esta carpeta.</p>
      ) : (
        <div className="image-grid">
          {images.map((image, index) => (
            <div key={index} className="menu-item-card">
              <img
                src={image.url}
                alt={image.name}
                className="menu-item-img"
              />
              <div className="menu-item-info">
                <h5 className="menu-item-name">{image.name}</h5>
                <p className="menu-item-category">
                  <strong>Carpeta:</strong> {folder}
                </p>
                <p className="menu-item-url">
                  <strong>URL:</strong>{" "}
                  <a href={image.url} target="_blank" rel="noopener noreferrer">
                    Ver Imagen
                  </a>
                </p>
                <div className="d-flex justify-content-center gap-2 mt-2">
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => setConfirmImageUrl(image.url)} // Abrir el popup
                    disabled={deleting}
                  >
                    {deleting ? "Eliminando..." : "Eliminar"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Popup de confirmación */}
      {confirmImageUrl && (
        <PopUpConfirmacion
          mensaje="¿Seguro que quieres eliminar esta imagen?"
          onCancel={() => setConfirmImageUrl(null)} // Cerrar el popup
          onConfirm={() => handleDelete(confirmImageUrl)} // Confirmar eliminación
        />
      )}

      {/* Mensaje de popup */}
      {popup && <div className="custom-popup">{popup}</div>}
    </div>
  );
};

export default ViewImages;