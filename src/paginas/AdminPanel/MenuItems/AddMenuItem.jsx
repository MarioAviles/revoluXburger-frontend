import React, { useState } from "react";
import useCategorias from "../../../hooks/useCategorias";
import useTipos from "../../../hooks/useTipos";

// Componente para añadir un producto al menú
const AddMenuItem = () => {
  // Hooks personalizados para obtener categorías y tipos
  const categorias = useCategorias();
  const tipos = useTipos();

  // Estado para el formulario
  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "",
    type: "",
    points: "",
    imageUrl: "",
    price: ""
  });

  // Estado para mostrar mensaje de éxito
  const [success, setSuccess] = useState(false);
  // Estado para mostrar mensaje de error
  const [error, setError] = useState(null);

  // Maneja los cambios en los campos del formulario
  const handleChange = e => {
    const { name, value } = e.target;
    // Si cambia la categoría y no es "Burger", resetea el tipo
    if (name === "category") {
      setForm(f => ({
        ...f,
        category: value,
        type: value === "Burger" ? f.type : ""
      }));
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // Maneja el envío del formulario
  const handleSubmit = async e => {
    e.preventDefault();
    setSuccess(false);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      // Prepara los datos a enviar, solo incluye type si la categoría es Burger
      const dataToSend = {
        name: form.name,
        description: form.description,
        category: form.category,
        ...(form.category === "Burger" && { type: form.type }),
        points: Number(form.points),
        imageUrl: form.imageUrl,
        price: Number(form.price)
      };
      // Si la categoría es Burger y no se ha seleccionado tipo, muestra error
      if (form.category === "Burger" && !form.type) {
        setError("Debes seleccionar un tipo para las burgers.");
        return;
      }
      // Realiza la petición al backend para añadir el producto
      const res = await fetch('https://revoluxburger-backend.onrender.com/menu', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(dataToSend)
      });
      // Si la respuesta no es correcta, lanza error
      if (!res.ok) throw new Error('Error al añadir producto');
      setSuccess(true);
      // Resetea el formulario
      setForm({ name: '', description: '', category: '', type: '', points: '', imageUrl: '', price: '' });
    } catch (err) {
      setError(err.message);
    }
  };

  // Renderiza el formulario
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
        {/* Solo muestra el campo tipo si la categoría es Burger */}
        {form.category === "Burger" && (
          <div className="mb-3">
            <label>Tipo</label>
            <select className="form-control" name="type" value={form.type} onChange={handleChange} required>
              <option value="">Selecciona un tipo</option>
              {tipos.map(typ => (
                <option key={typ.nombre} value={typ.nombre}>{typ.nombre}</option>
              ))}
            </select>
          </div>
        )}
        <div className="mb-3">
          <label>Puntos</label>
          <input type="number" step="0.01" className="form-control" name="points" value={form.points} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Imagen (URL)</label>
          <input type="text" className="form-control" name="imageUrl" value={form.imageUrl} onChange={handleChange} required/>
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