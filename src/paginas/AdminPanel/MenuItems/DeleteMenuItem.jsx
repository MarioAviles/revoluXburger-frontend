import React, { useState, useEffect } from "react";
import { getAllMenuItems, deleteMenuItem } from "../../../servicios/menuService";

const DeleteMenuItem = () => {
  const [productos, setProductos] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [popup, setPopup] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProductos = async () => {
    setLoading(true);
    setPopup(null);
    try {
      const token = localStorage.getItem("token");
      const data = await getAllMenuItems(token);
      setProductos(data);
    } catch {
      setPopup("Error al cargar productos");
      setTimeout(() => setPopup(null), 3000);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPopup(null);
    try {
      const token = localStorage.getItem("token");
      await deleteMenuItem(selectedId, token);
      setPopup("Producto eliminado correctamente");
      setSelectedId("");
      fetchProductos();
      setTimeout(() => setPopup(null), 3000);
    } catch (err) {
      setPopup("Error al eliminar producto");
      setTimeout(() => setPopup(null), 3000);
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
          <button className="btn btn-danger w-100" type="submit" disabled={!selectedId}>Eliminar</button>
        </form>
      )}
      {popup && <div className="custom-popup">{popup}</div>}
    </div>
  );
};

export default DeleteMenuItem;