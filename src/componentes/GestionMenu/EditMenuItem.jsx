import React, { useState, useEffect, useCallback } from "react";
import { getAllMenuItems, updateMenuItem } from "../../servicios/menuService";
import useCategorias from "../../hooks/useCategorias";
import useTipos from "../../hooks/useTipos";
import { useFetchImages } from "../../hooks/useFetchImages";
import { useParams, useNavigate } from "react-router-dom";

const EditMenuItem = () => {
  const navigate = useNavigate();
  const { menuItemId } = useParams();
  const { categorias, loading: loadingCategorias } = useCategorias();
  const { tipos, loading: loadingTipos } = useTipos();
  const [productos, setProductos] = useState([]);
  const [selectedId, setSelectedId] = useState("");
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
  const [selectedFolder, setSelectedFolder] = useState("burgers"); // Carpeta seleccionada por defecto

  // Hook para cargar imágenes
  const { urls: images, error, loading, fetchImages } = useFetchImages();

  // Mememorizar fetchImages para evitar múltiples instancias
  const mememorizedFetchImages = useCallback(fetchImages, []);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const token = localStorage.getItem("token");
        const data = await getAllMenuItems(token);
        setProductos(data);
      } catch {
        setPopup("Error al cargar productos");
        setTimeout(() => setPopup(null), 3000);
      }
    };
    fetchProductos();
  }, []);

  useEffect(() => {
    if (menuItemId && productos.length > 0) {
      setSelectedId(menuItemId);
      const prod = productos.find((p) => String(p.id) === String(menuItemId));
      setForm({
        name: prod?.name || "",
        description: prod?.description || "",
        categoryId: prod?.categoryId || "",
        typeId: prod?.typeId || "",
        points: prod?.points ?? "",
        imageUrl: prod?.imageUrl || "",
        price: prod?.price ?? ""
      });
      setSelectedFolder(categorias.find((cat) => cat.id === prod?.categoryId)?.name || "burger"); // Seleccionar carpeta basada en la categoría
      setPopup(null);
    }
  }, [menuItemId, productos, categorias]);

  useEffect(() => {
    if (selectedFolder) {
      mememorizedFetchImages(selectedFolder); // Cargar imágenes de la carpeta seleccionada
    }
  }, [selectedFolder, mememorizedFetchImages]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPopup(null);
    if (!selectedId) {
      setPopup("Selecciona un producto para editar.");
      setTimeout(() => setPopup(null), 3000);
      return;
    }
    try {
      const token = localStorage.getItem("token");
      await updateMenuItem(
        selectedId,
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
      setPopup("Producto editado correctamente");
      setTimeout(() => setPopup(null), 3000);
      navigate(`/admin-panel`);
    } catch (err) {
      setPopup("Error al editar producto");
      setTimeout(() => setPopup(null), 3000);
    }
  };

  const isBurgerCategory = categorias.find(
    (cat) => cat.id === Number(form.categoryId) && cat.name.toLowerCase() === "burger"
  );

  if (loadingCategorias || loadingTipos) return <div>Cargando datos...</div>;

  return (
    <div className="admin-crud-page">
      <h3>Editar producto</h3>
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
              setSelectedFolder(categorias.find((cat) => cat.id === Number(e.target.value))?.name || "burgers");
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
            <label>Tipo</label>
            <select
              className="form-control"
              name="typeId"
              value={form.typeId}
              onChange={handleChange}
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
            <div className="image-grid  d-flex flex-wrap justify-content-center">
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
        <button className="btn btn-primary w-100" type="submit" disabled={!selectedId}>
          Editar
        </button>
      </form>
      {popup && <div className="custom-popup">{popup}</div>}
    </div>
  );
};

export default EditMenuItem;