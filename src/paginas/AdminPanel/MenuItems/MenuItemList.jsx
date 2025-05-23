import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllMenuItems, deleteMenuItem } from "../../../servicios/menuService";
import "./MenuItemList.css";
import PopUpConfirmacion from "../../../componentes/PopUpConfirmacion/PopUpConfirmacion";
import MenuItemCard from "./MenuItemCard";
import useCategorias from "../../../hooks/useCategorias";
import useTipos from "../../../hooks/useTipos";

const MenuItemList = () => {
  const [productos, setProductos] = useState([]);
  const [search, setSearch] = useState("");
  const [categoria, setCategoria] = useState("");
  const [tipo, setTipo] = useState(""); // Nuevo estado para filtrar por tipo
  const navigate = useNavigate();
  const [deletingId, setDeletingId] = useState(null);
  const [confirmId, setConfirmId] = useState(null);
  const [popup, setPopup] = useState(null);

  const { categorias, loading: loadingCategorias } = useCategorias();
  const { tipos, loading: loadingTipos } = useTipos();

  const fetchProductos = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setPopup("No tienes permisos para acceder a esta página. Por favor, inicia sesión.");
        return;
      }
      const data = await getAllMenuItems(token);
      setProductos(data);
    } catch (err) {
      if (err.message.includes("403")) {
        setPopup("No tienes permisos para acceder a esta página.");
      } else {
        setPopup("Error al cargar productos");
      }
      setTimeout(() => setPopup(null), 3000);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      const token = localStorage.getItem("token");
      await deleteMenuItem(id, token);
      setProductos(productos.filter((p) => p.id !== id));
    } catch {
      setPopup("Error al eliminar producto");
      setTimeout(() => setPopup(null), 3000);
    } finally {
      setDeletingId(null);
      setConfirmId(null);
    }
  };

  const productosFiltrados = productos.filter((p) => {
    const busquedaCoincide = p.name.toLowerCase().includes(search.toLowerCase());
    const categoriaCoincide = categoria ? p.categoryId === Number(categoria) : true;
    const tipoCoincide = tipo ? p.typeId === Number(tipo) : true;
    return busquedaCoincide && categoriaCoincide && tipoCoincide;
  });

  // Verificar si la categoría seleccionada es "Burger"
  const isBurgerCategory = categorias.find(
    (cat) => cat.id === Number(categoria) && cat.name.toLowerCase() === "burger"
  );

  if (loadingCategorias || loadingTipos) return <div>Cargando datos...</div>;

  return (
    <div className="menu-item-list-page">
      <h3 className="menu-item-list-title">Lista de productos</h3>
      <p className="menu-item-list-description">Puedes buscar productos por nombre, categoría o tipo.</p>

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
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>

      {/* Mostrar el filtro de tipo solo si la categoría es "Burger" */}
      {isBurgerCategory && (
        <>
          <label className="menu-item-list-filter-label mb-2">Filtrar por tipo:</label>
          <select
            className="menu-item-list-filter form-control mb-3"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
          >
            <option value="">Todos los tipos</option>
            {tipos.map((tipo) => (
              <option key={tipo.id} value={tipo.id}>
                {tipo.name}
              </option>
            ))}
          </select>
        </>
      )}

      <div className="menu-item-list-grid">
        {productosFiltrados.map((p) => (
          <MenuItemCard
            key={p.id}
            producto={p}
            onEdit={() => navigate(`/admin/menu/edit/${p.id}`)}
            onDelete={() => setConfirmId(p.id)}
            deleting={deletingId === p.id}
          />
        ))}
      </div>
      {confirmId && (
        <PopUpConfirmacion
          mensaje="¿Seguro que quieres eliminar este producto?"
          onCancel={() => setConfirmId(null)}
          onConfirm={() => handleDelete(confirmId)}
        />
      )}
      {popup && <div className="custom-popup">{popup}</div>}
    </div>
  );
};

export default MenuItemList;