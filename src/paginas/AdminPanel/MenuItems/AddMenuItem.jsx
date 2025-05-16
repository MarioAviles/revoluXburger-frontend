import React, { useState } from "react";
import useCategorias from "../../../hooks/useCategorias";
import useTipos from "../../../hooks/useTipos";

const AddMenuItem = () => {
  const categorias = useCategorias();
  const tipos = useTipos();
  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "",
    type: "",
    points: "",
    imageUrl: "",
    price: ""
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setSuccess(false);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      const dataToSend = {
        name: form.name,
        description: form.description,
        category: form.category,
        type: form.type,
        points: Number(form.points),
        imageUrl: form.imageUrl,
        price: Number(form.price)
      };
      const res = await fetch('https://revoluxburger-backend.onrender.com/menu', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(dataToSend)
      });
      if (!res.ok) throw new Error('Error al añadir producto');
      setSuccess(true);
      setForm({ name: '', description: '', category: '', type: '', points: '', imageUrl: '', price: '' });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="admin-crud-page">
      <h3>Añadir producto al menú</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Nombre</label>
          <input type="text" className="form-control" name="name" value={form.name} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Descripción</label>
          <textarea className="form-control" name="description" value={form.description} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Categoría</label>
          <select className="form-control" name="category" value={form.category} onChange={handleChange} required>
            <option value="">Selecciona una categoría</option>
            {categorias.map(cat => (
              <option key={cat.nombre} value={cat.nombre}>{cat.nombre}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label>Tipo</label>
          <select className="form-control" name="type" value={form.type} onChange={handleChange} required>
            <option value="">Selecciona un tipo</option>
            {tipos.map(typ => (
              <option key={typ.nombre} value={typ.nombre}>{typ.nombre}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label>Puntos</label>
          <input type="number" step="0.01" className="form-control" name="points" value={form.points} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Imagen (URL)</label>
          <input type="text" className="form-control" name="imageUrl" value={form.imageUrl} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label>Precio</label>
          <input type="number" step="0.01" className="form-control" name="price" value={form.price} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-warning w-100">Añadir al menú</button>
      </form>
      {success && <div className="alert alert-success mt-3">¡Producto añadido!</div>}
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </div>
  );
};

export default AddMenuItem;