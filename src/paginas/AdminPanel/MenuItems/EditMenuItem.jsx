import React, { useState, useEffect } from "react";
import useCategorias from "../../../hooks/useCategorias";
import useTipos from "../../../hooks/useTipos";

const BASE_URL = "https://revoluxburger-backend.onrender.com/menu";

const EditMenuItem = () => {
  const categorias = useCategorias();
  const tipos = useTipos();
  const [productos, setProductos] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "",
    type: "",
    points: "",
    imageUrl: "",
    price: ""
  });
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  // Cargar productos al montar
  useEffect(() => {
    fetch(BASE_URL)
      .then(res => res.json())
      .then(data => setProductos(data))
      .catch(() => setError("Error al cargar productos"));
  }, []);

  // Cuando seleccionas un producto, carga sus datos en el formulario
  const handleSelect = (e) => {
  const id = e.target.value;
  setSelectedId(id);
  // Busca el producto por id o _id
  const prod = productos.find(p => String(p.id) === String(id) || String(p._id) === String(id));
  setForm({
    name: prod?.name || "",
    description: prod?.description || "",
    category: prod?.category || "",
    type: prod?.type || "",
    points: prod?.points ?? "",
    imageUrl: prod?.imageUrl || "",
    price: prod?.price ?? ""
  });
  setMensaje("");
  setError("");
};

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");
    setError("");
    if (!selectedId) {
      setError("Selecciona un producto para editar.");
      return;
    }
    const token = localStorage.getItem("token");
    try {
      const dataToSend = {
        name: form.name,
        description: form.description,
        category: form.category,
        type: form.type,
        points: Number(form.points),
        imageUrl: form.imageUrl,
        price: Number(form.price)
      };
      const res = await fetch(`${BASE_URL}/${selectedId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dataToSend),
      });
      if (!res.ok) throw new Error("Error al editar producto");
      setMensaje("Producto editado correctamente");
    } catch (err) {
      setError(err.message || "Error al editar producto");
    }
  };

  return (
    <div className="admin-crud-page">
      <h3>Editar producto</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Selecciona producto</label>
          <select className="form-control" value={selectedId} onChange={handleSelect} required>
            <option value="">-- Selecciona --</option>
            {productos.length === 0 && <option disabled>No hay productos</option>}
            {productos.map(p => (
              <option key={p.id} value={p.id}>{p.name} - {p.price}€</option>
            ))}
          </select>
        </div>
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
            {categorias && categorias.length === 0 && <option disabled>No hay categorías</option>}
            {categorias && categorias.map(cat => (
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
              {tipos && tipos.length === 0 && <option disabled>No hay tipos</option>}
              {tipos && tipos.map(typ => (
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
          <input type="text" className="form-control" name="imageUrl" value={form.imageUrl} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label>Precio</label>
          <input type="number" step="0.01" className="form-control" name="price" value={form.price} onChange={handleChange} required />
        </div>
        <button className="btn btn-primary" type="submit" disabled={!selectedId}>Editar</button>
      </form>
      {mensaje && <div className="alert alert-info mt-3">{mensaje}</div>}
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </div>
  );
};

export default EditMenuItem;