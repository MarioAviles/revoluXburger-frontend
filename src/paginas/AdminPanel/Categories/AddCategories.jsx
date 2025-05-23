import React, { useState } from "react";
import { createCategoria } from "../../../servicios/categoriasService";
import { useNavigate } from "react-router-dom";

const AddCategories = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    imageCat: "",
  });
  const [popup, setPopup] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPopup(null);

    try {
      const token = localStorage.getItem("token");
      await createCategoria(form, token);
      setPopup("Categoría añadida correctamente");
      setTimeout(() => {
        setPopup(null);
        navigate("/admin-panel");
      }, 3000);
    } catch (err) {
      setPopup(err.message || "Error al añadir categoría");
      setTimeout(() => setPopup(null), 3000);
    }
  };

  return (
    <div className="admin-crud-page">
      <h3>Añadir categoría</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Nombre de la categoría</label>
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
          <label>Imagen (URL)</label>
          <input
            type="text"
            className="form-control"
            name="imageCat"
            value={form.imageCat}
            onChange={handleChange}
            required
          />
        </div>
        <button className="btn btn-success w-100" type="submit">
          Añadir
        </button>
      </form>
      {popup && <div className="custom-popup">{popup}</div>}
    </div>
  );
};

export default AddCategories;