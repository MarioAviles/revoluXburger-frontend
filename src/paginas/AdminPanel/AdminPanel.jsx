import './AdminPanel.css';
import { useState } from 'react';

const AdminPanel = () => {
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: ''
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
      const res = await fetch('https://revoluxburger-backend.onrender.com/menu', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });
      if (!res.ok) throw new Error('Error al añadir producto');
      setSuccess(true);
      setForm({ name: '', description: '', price: '', category: '', image: '' });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="admin-panel container py-5">
      <h2 className="mb-4 text-center">Panel de Administración</h2>
      <div className="admin-form-box p-4 mx-auto" style={{ maxWidth: 500, background: "#232323", borderRadius: 10 }}>
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
            <label className="form-label text-light">Precio</label>
            <input type="number" className="form-control" name="price" value={form.price} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label text-light">Categoría</label>
            <input type="text" className="form-control" name="category" value={form.category} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label text-light">Imagen (URL)</label>
            <input type="text" className="form-control" name="image" value={form.image} onChange={handleChange} />
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