import React, { useEffect, useState } from "react";

const BASE_URL = "https://revoluxburger-backend.onrender.com/menu";

const MenuItemList = () => {
  const [productos, setProductos] = useState([]);
  const [search, setSearch] = useState(""); // Estado para el buscador
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(BASE_URL)
      .then(res => res.json())
      .then(data => setProductos(data))
      .catch(() => setError("Error al cargar productos"));
  }, []);

  // Filtrar productos según el texto del buscador
  const filteredProductos = productos.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="admin-crud-page">
      <h3 className="mb-4">Lista de productos</h3>
      <p className="mb-4">Puedes buscar productos por nombre.</p>
        <input
          type="text"
          className="form-control"
          placeholder="Buscar por nombre..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      <ul className="list-group">
        {filteredProductos.map(p => (
          <li key={p._id} className="list-group-item">
            {p.name} - {p.price}€ - {p.category}
          </li>
        ))}
      </ul>
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </div>
  );
};

export default MenuItemList;