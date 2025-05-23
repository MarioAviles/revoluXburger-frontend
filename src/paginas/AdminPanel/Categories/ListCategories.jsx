import React, { useState, useEffect } from "react";
import { getAllCategorias, deleteCategoria } from "../../../servicios/categoriasService";
import PopupConfirmacion from "../../../componentes/PopUpConfirmacion/PopUpConfirmacion";

const ListCategories = () => {
  const [categorias, setCategorias] = useState([]);
  const [deletingId, setDeletingId] = useState(null);
  const [confirmId, setConfirmId] = useState(null);
  const [popup, setPopup] = useState(null);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const token = localStorage.getItem("token");
        const data = await getAllCategorias(token);
        setCategorias(data);
      } catch (err) {
        setPopup("Error al cargar categorías");
        setTimeout(() => setPopup(null), 3000);
      }
    };
    fetchCategorias();
  }, []);

  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      const token = localStorage.getItem("token");
      await deleteCategoria(id, token);
      setCategorias(categorias.filter(cat => cat.id !== id));
      setPopup("Categoría eliminada correctamente");
      setTimeout(() => setPopup(null), 3000);
    } catch (err) {
      setPopup("Error al eliminar categoría");
      setTimeout(() => setPopup(null), 3000);
    } finally {
      setDeletingId(null);
      setConfirmId(null);
    }
  };

  return (
    <div className="admin-crud-page">
      <h3>Lista de categorías</h3>
      <ul className="list-group">
        {categorias.map(cat => (
          <li key={cat.id} className="list-group-item d-flex justify-content-between align-items-center">
            <span>{cat.name}</span>
            <div>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => setConfirmId(cat.id)}
                disabled={deletingId === cat.id}
              >
                {deletingId === cat.id ? "Eliminando..." : "Eliminar"}
              </button>
            </div>
          </li>
        ))}
      </ul>
      {confirmId && (
        <PopupConfirmacion
          mensaje="¿Seguro que quieres eliminar esta categoría?"
          onCancel={() => setConfirmId(null)}
          onConfirm={() => handleDelete(confirmId)}
        />
      )}
      {popup && <div className="custom-popup">{popup}</div>}
    </div>
  );
};

export default ListCategories;