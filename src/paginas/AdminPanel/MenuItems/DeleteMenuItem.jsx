import React, { useState, useEffect } from "react";

const BASE_URL = "https://revoluxburger-backend.onrender.com/menu";

const DeleteMenuItem = () => {
  const token = localStorage.getItem("token");
  const [productos, setProductos] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(BASE_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setProductos(data);
    } catch {
      setError("Error al cargar productos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");
    setError("");
    try {
      const res = await fetch(`${BASE_URL}/${selectedId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Error al eliminar producto");
      setMensaje("Producto eliminado correctamente");
      setSelectedId("");
      fetchData();
    } catch (err) {
      setError(err.message || "Error al eliminar producto");
    }
  };

  return (
    <div className="admin-crud-page">
      <h3>Eliminar producto</h3>
      {loading ? <div>Cargando productos...</div> : (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Selecciona producto</label>
            <select className="form-control" value={selectedId} onChange={e => setSelectedId(e.target.value)} required>
              <option value="">-- Selecciona --</option>
              {productos.map(p => (
                <option key={p.id} value={p.id}>{p.name} - {p.price}€</option>
              ))}
            </select>
          </div>
          <button className="btn btn-danger" type="submit" disabled={!selectedId}>Eliminar</button>
        </form>
      )}
      {mensaje && <div className="alert alert-info mt-3">{mensaje}</div>}
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </div>
  );
};

export default DeleteMenuItem;