import './AdminPanel.css';
import { useState } from 'react';
import useCategorias from '../../hooks/useCategorias';
import useTipos from '../../hooks/useTipos';

const AdminPanel = () => {
    const categorias = useCategorias();
    const tipos = useTipos();
  const [form, setForm] = useState({
    name: '',
    description: '',
    category: '',
    type: '',
    points: '',
    imageUrl: '',
    price: ''

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
    // Prepara el objeto con los nombres y tipos correctos
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
    <div className="admin-panel container py-5">
      <h2 className="mb-4 text-center">Panel de Administración</h2>
      <div className="admin-form-box p-4 mx-auto" >
        <h4 className="mb-3 text-warning">Añadir producto al menú</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label text-light">Nombre</label>
            <input type="text" className="form-control" name="name" value={form.name} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label text-light">Descripción</label>
            <textarea className="form-control" name="description" value={form.description} onChange={handleChange} required />
          </div>
           <div className="mb-3">
            <label className="form-label text-light">Categoria</label>
            <select className="form-control" name="category" value={form.category} onChange={handleChange} required>
              <option value="">Selecciona una categoría</option>
              {categorias.map(cat => (
                <option key={cat.nombre} value={cat.nombre}>{cat.nombre}</option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label text-light">Tipo</label>
            <select className="form-control" name="type" value={form.type} onChange={handleChange} required>
              <option value="">Selecciona un tipo</option>
              {tipos.map(typ => (
                <option key={typ.nombre} value={typ.nombre}>{typ.nombre}</option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label text-light">Puntos</label>
            <input type="number" step="0.01" className="form-control" name="points" value={form.points} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label text-light">Imagen (URL)</label>
            <input type="text" className="form-control" name="imageUrl" value={form.imageUrl} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="form-label text-light">Precio</label>
            <input type="number" step="0.01" className="form-control" name="price" value={form.price} onChange={handleChange} required />
          </div>
          <button type="submit" className="btn btn-warning w-100">Añadir al menú</button>
        </form>
        {success && <div className="alert alert-success mt-3">¡Producto añadido!</div>}
        {error && <div className="alert alert-danger mt-3">{error}</div>}
      </div>
    </div>
  );
};

export default AdminPanel;