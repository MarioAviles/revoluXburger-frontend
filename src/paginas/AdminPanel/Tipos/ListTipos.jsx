import React, { useState, useEffect } from "react";
import { getAllTipos, deleteTipo } from "../../../servicios/tiposService";
import PopupConfirmacion from "../../../componentes/PopUpConfirmacion/PopUpConfirmacion";

const ListTipos = () => {
  const [tipos, setTipos] = useState([]);
  const [deletingId, setDeletingId] = useState(null);
  const [confirmId, setConfirmId] = useState(null);
  const [popup, setPopup] = useState(null);

  useEffect(() => {
    const fetchTipos = async () => {
      try {
        const token = localStorage.getItem("token");
        const data = await getAllTipos(token);
        setTipos(data);
      } catch (err) {
        setPopup("Error al cargar tipos");
        setTimeout(() => setPopup(null), 3000);
      }
    };
    fetchTipos();
  }, []);

  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      const token = localStorage.getItem("token");
      await deleteTipo(id, token);
      setTipos(tipos.filter((tipo) => tipo.id !== id));
      setPopup("Tipo eliminado correctamente");
      setTimeout(() => setPopup(null), 3000);
    } catch (err) {
      setPopup("Error al eliminar tipo");
      setTimeout(() => setPopup(null), 3000);
    } finally {
      setDeletingId(null);
      setConfirmId(null);
    }
  };

  return (
    <div className="admin-crud-page">
      <h3>Lista de tipos</h3>
      <ul className="list-group">
        {tipos.map((tipo) => (
          <li key={tipo.id} className="list-group-item d-flex justify-content-between align-items-center">
            <span>{tipo.name}</span>
            <div>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => setConfirmId(tipo.id)}
                disabled={deletingId === tipo.id}
              >
                {deletingId === tipo.id ? "Eliminando..." : "Eliminar"}
              </button>
            </div>
          </li>
        ))}
      </ul>
      {confirmId && (
        <PopupConfirmacion
          mensaje="¿Seguro que quieres eliminar este tipo?"
          onCancel={() => setConfirmId(null)}
          onConfirm={() => handleDelete(confirmId)}
        />
      )}
      {popup && <div className="custom-popup">{popup}</div>}
    </div>
  );
};

export default ListTipos;