import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MenuItemList.css"; // Importa el archivo CSS para los estilos
const BASE_URL = "https://revoluxburger-backend.onrender.com/menu";

const MenuItemList = () => {
  const [productos, setProductos] = useState([]);
  const [search, setSearch] = useState(""); // Estado para el buscador
  const [categoria, setCategoria] = useState(""); // Estado para la categoría seleccionada
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(BASE_URL)
      .then((res) => res.json())
      .then((data) => setProductos(data))
      .catch(() => setError("Error al cargar productos"));
  }, []);

  // Filtrar productos según el texto del buscador y la categoría seleccionada
  const productosFiltradosPorBusqueda = productos.filter((p) => {
    const busquedaCoincide = p.name.toLowerCase().includes(search.toLowerCase());
    const categoriaCoincide = categoria ? p.category === categoria : true;
    return busquedaCoincide && categoriaCoincide;
  });

  // Obtener las categorías únicas de los productos
  const categorias = [...new Set(productos.map((p) => p.category))];

  return (
    <div className="menu-item-list-page">
      <h3 className="menu-item-list-title">Lista de productos</h3>
      <p className="menu-item-list-description">Puedes buscar productos por nombre o filtrar por categoría.</p>

      {/* Buscador */}
      <input
        type="text"
        className="menu-item-list-search form-control mb-3"
        placeholder="Buscar por nombre..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Filtro de categorías */}
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

      {/* Lista de productos */}
      <div className="menu-item-list-grid">
        {productosFiltradosPorBusqueda.map((p, id) => (
          <div
            key={p.id}
            className={`menu-item-card ${productosFiltradosPorBusqueda.length === 1 ? "producto-unico" : ""}`}
            onClick={() =>
              navigate(`/carta/${p.category.toLowerCase()}/${p.name.toLowerCase().replace(/\s+/g, "-")}`)
            }
          >
            <img src={p.imageUrl} alt={p.name} className="menu-item-img" />
            <div className="menu-item-info">
              <h5 className="menu-item-name">{p.name}</h5>
              <p className="menu-item-price">{p.price.toFixed(2)} €</p>
              <p className="menu-item-category">{p.category}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Mensaje de error */}
      {error && <div className="menu-item-error alert alert-danger mt-3">{error}</div>}
    </div>
  );
};

export default MenuItemList;