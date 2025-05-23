import React, { useState, useEffect, useCallback } from "react";
import { createMenuItem } from "../../../servicios/menuService";
import { useFetchImages } from "../../../hooks/useFetchImages";
import useCategorias from "../../../hooks/useCategorias";
import useTipos from "../../../hooks/useTipos";
import { useNavigate } from "react-router-dom";

const AddMenuItem = () => {
  const navigate = useNavigate();
  const { categorias, loading: loadingCategorias } = useCategorias();
  const { tipos, loading: loadingTipos } = useTipos();
  const [form, setForm] = useState({
    name: "",
    description: "",
    categoryId: "",
    typeId: "",
    points: "",
    imageUrl: "",
    price: ""
  });
  const [popup, setPopup] = useState(null);
  const [selectedFolder, setSelectedFolder] = useState(""); // Carpeta seleccionada

  // Hook para cargar imágenes
  const { urls: images, error, loading, fetchImages } = useFetchImages();

  // Memoizar fetchImages para evitar múltiples instancias
  const memoizedFetchImages = useCallback(fetchImages, []);

  useEffect(() => {
    if (selectedFolder) {
      memoizedFetchImages(selectedFolder); // Cargar imágenes de la carpeta seleccionada
    }
  }, [selectedFolder, memoizedFetchImages]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await createMenuItem(
        {
          name: form.name,
          description: form.description,
          categoryId: form.categoryId,
          typeId: form.typeId || null,
          points: Number(form.points),
          imageUrl: form.imageUrl,
          price: Number(form.price)
        },
        token
      );

      setPopup("Producto añadido correctamente");
      setForm({ name: "", description: "", categoryId: "", typeId: "", points: "", imageUrl: "", price: "" });
      setTimeout(() => setPopup(null), 3000);
      navigate(`/admin-panel`);
    } catch (err) {
      setPopup("Error al añadir producto");
      setTimeout(() => setPopup(null), 3000);
    }
  };

  if (loadingCategorias || loadingTipos) return <div>Cargando datos...</div>;

  // Verificar si la categoría seleccionada es "Burger"
  const isBurgerCategory = categorias.find(
    (cat) => cat.id === Number(form.categoryId) && cat.name.toLowerCase() === "burger"
  );

  return (
    <div className="admin-crud-page">
      <h3>Añadir producto al menú</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Nombre</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Descripción</label>
          <textarea
            className="form-control"
            name="description"
            value={form.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Categoría</label>
          <select
            className="form-control"
            name="categoryId"
            value={form.categoryId}
            onChange={(e) => {
              handleChange(e);
              const selectedCategory = categorias.find((cat) => cat.id === Number(e.target.value));
              setSelectedFolder(selectedCategory?.name || ""); // Actualiza la carpeta seleccionada
            }}
            required
          >
            <option value="">Selecciona una categoría</option>
            {categorias.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        {isBurgerCategory && (
          <div className="mb-3">
            <label>Tipo de hamburguesa</label>
            <select
              className="form-control"
              name="typeId"
              value={form.typeId}
              onChange={handleChange}
              required
            >
              <option value="">Selecciona un tipo</option>
              {tipos.map((tipo) => (
                <option key={tipo.id} value={tipo.id}>
                  {tipo.name}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className="mb-3">
          <label>Puntos</label>
          <input
            type="number"
            step="0.50"
            className="form-control"
            name="points"
            value={form.points}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Carpeta de imágenes</label>
          <select
            className="form-control"
            value={selectedFolder}
            onChange={(e) => setSelectedFolder(e.target.value)}
          >
            <option value="">Selecciona una carpeta</option>
            {categorias.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label>Seleccionar imagen</label>
          {loading && <p>Cargando imágenes...</p>}
          {error && <p className="text-danger">{error}</p>}
          {images.length > 0 ? (
            <div className="image-grid d-flex flex-wrap justify-content-center">
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image.url} // Ajuste para usar la propiedad `url`
                  alt={image.name} // Ajuste para usar la propiedad `name`
                  className={`image-item ${form.imageUrl === image.url ? "selected" : ""}`}
                  onClick={() => setForm((f) => ({ ...f, imageUrl: image.url }))}
                />
              ))}
            </div>
          ) : (
            !loading && <p>No hay imágenes disponibles en esta carpeta.</p>
          )}
        </div>
        <div className="mb-3">
          <label>Precio</label>
          <input
            type="number"
            step="0.50"
            className="form-control"
            name="price"
            value={form.price}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-warning w-100">
          Añadir al menú
        </button>
      </form>
      {popup && <div className="custom-popup">{popup}</div>}
    </div>
  );
};

export default AddMenuItem;