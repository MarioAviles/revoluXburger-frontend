import React, { useState, useEffect } from "react";
import { getAllMenuItems, updateMenuItem } from "../../../servicios/menuService";
import UploadImages from "../UploadImages/UploadImages";
import useCategorias from "../../../hooks/useCategorias";
import { useParams, useNavigate } from "react-router-dom";

const EditMenuItem = () => {
  const navigate = useNavigate();
  const { menuItemId } = useParams();
  const { categorias, loading: loadingCategorias } = useCategorias();
  const [productos, setProductos] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [form, setForm] = useState({
    name: "",
    description: "",
    categoryId: "",
    points: "",
    imageUrl: "",
    price: ""
  });
  const [popup, setPopup] = useState(null);

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
        points: prod?.points ?? "",
        imageUrl: prod?.imageUrl || "",
        price: prod?.price ?? ""
      });
      setPopup(null);
    }
  }, [menuItemId, productos]);

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

  if (loadingCategorias) return <div>Cargando categorías...</div>;

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
            onChange={handleChange}
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
          <label>Imagen (URL)</label>
          <UploadImages onUpload={(url) => setForm((f) => ({ ...f, imageUrl: url }))} />
          {form.imageUrl && (
            <div className="mt-2">
              <input
                type="text"
                className="form-control"
                name="imageUrl"
                value={form.imageUrl}
                readOnly
              />
              <img src={form.imageUrl} alt="preview" style={{ maxWidth: "150px", marginTop: "10px" }} />
            </div>
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
        <button className="btn btn-primary w-100" type="submit" disabled={!selectedId}>
          Editar
        </button>
      </form>
      {popup && <div className="custom-popup">{popup}</div>}
    </div>
  );
};

export default EditMenuItem;