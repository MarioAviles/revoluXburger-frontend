import React, { useEffect, useState } from "react";

const BASE_URL = "https://revoluxburger-backend.onrender.com/menu";

const MenuItemList = () => {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(BASE_URL)
      .then(res => res.json())
      .then(data => setProductos(data))
      .catch(() => setError("Error al cargar productos"));
  }, []);

  return (
    <div className="admin-crud-page">
      <h3>Lista de productos</h3>
      <ul className="list-group">
        {productos.map(p => (
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