import React, { useState } from "react";
import { createMenuItem } from "../../../servicios/menuService";
import UploadImages from "../UploadImages/UploadImages";
import useCategorias from "../../../hooks/useCategorias";
import { useNavigate } from "react-router-dom";

const AddMenuItem = () => {
  const navigate = useNavigate();
  const { categorias, loading: loadingCategorias } = useCategorias();
  const [form, setForm] = useState({
    name: "",
    description: "",
    categoryId: "",
    points: "",
    imageUrl: "",
    price: ""
  });
  const [popup, setPopup] = useState(null);

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
          points: Number(form.points),
          imageUrl: form.imageUrl,
          price: Number(form.price)
        },
        token
      );

      setPopup("Producto añadido correctamente");
      setForm({ name: "", description: "", categoryId: "", points: "", imageUrl: "", price: "" });
      setTimeout(() => setPopup(null), 3000);
      navigate(`/admin-panel`);
    } catch (err) {
      setPopup("Error al añadir producto");
      setTimeout(() => setPopup(null), 3000);
    }
  };

  if (loadingCategorias) return <div>Cargando categorías...</div>;

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
        <button type="submit" className="btn btn-warning w-100">
          Añadir al menú
        </button>
      </form>
      {popup && <div className="custom-popup">{popup}</div>}
    </div>
  );
};

export default AddMenuItem;