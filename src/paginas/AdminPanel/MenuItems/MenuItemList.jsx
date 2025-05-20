import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllMenuItems } from "../../../servicios/menuService";
import "./MenuItemList.css";

const MenuItemList = () => {
  const [productos, setProductos] = useState([]);
  const [search, setSearch] = useState("");
  const [categoria, setCategoria] = useState("");
  const navigate = useNavigate();
  const [deletingId, setDeletingId] = useState(null);
  const [confirmId, setConfirmId] = useState(null);


  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const token = localStorage.getItem("token");
        const data = await getAllMenuItems(token);
        setProductos(data);
      } catch (err) {
        setPopup("Error al cargar productos");
        setTimeout(() => setPopup(null), 3000);
      }
    };
    fetchProductos();
  }, []);

  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      const token = localStorage.getItem("token");
      await deleteMenuItem(id, token);
      setProductos(productos.filter(p => p.id !== id));
    } catch {
      setPopup("Error al eliminar producto");
      setTimeout(() => setPopup(null), 3000);
    } finally {
      setDeletingId(null);
      setConfirmId(null);
    }
  };

  const productosFiltradosPorBusqueda = productos.filter((p) => {
    const busquedaCoincide = p.name.toLowerCase().includes(search.toLowerCase());
    const categoriaCoincide = categoria ? p.category === categoria : true;
    return busquedaCoincide && categoriaCoincide;
  });

  const categorias = [...new Set(productos.map((p) => p.category))];

  return (
    <div className="menu-item-list-page">
      <h3 className="menu-item-list-title">Lista de productos</h3>
      <p className="menu-item-list-description">Puedes buscar productos por nombre o filtrar por categoría.</p>

      <input
        type="text"
        className="menu-item-list-search form-control mb-3"
        placeholder="Buscar por nombre..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <label className="menu-item-list-filter-label mb-2">Filtrar por categoría:</label>
      <select
        className="menu-item-list-filter form-control mb-3"
        value={categoria}
        onChange={(e) => setCategoria(e.target.value)}
      >
        <option value="">Todas las categorías</option>
        {categorias.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <div className="menu-item-list-grid">
        {productosFiltradosPorBusqueda.map((p) => (
          <div
            key={p.id || p._id}
            className={`menu-item-card ${productosFiltradosPorBusqueda.length === 1 ? "producto-unico" : ""}`}
          >
            <img src={p.imageUrl} alt={p.name} className="menu-item-img" />
            <div className="menu-item-info">
              <h5 className="menu-item-name">{p.name}</h5>
              <p className="menu-item-price">{p.price.toFixed(2)} €</p>
              <p className="menu-item-category">{p.category}</p>
              <button
                className="btn btn-danger btn-sm mt-2"
                onClick={() => setConfirmId(p.id || p._id)}
                disabled={deletingId === (p.id || p._id)}
              >
                {deletingId === (p.id || p._id) ? "Eliminando..." : "Eliminar"}
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Popup de confirmación */}
      {confirmId && (
        <div className="popup-eliminar-overlay">
          <div className="popup-eliminar">
            <p>¿Seguro que quieres eliminar este producto?</p>
            <div className="d-flex justify-content-center gap-2">
              <button className="btn btn-secondary" onClick={() => setConfirmId(null)}>Cancelar</button>
              <button className="btn btn-danger" onClick={() => handleDelete(confirmId)}>Eliminar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuItemList;