import { useEffect, useState } from "react";
import { getAllReservations, deleteReservation } from "../../../servicios/reservasService";

const ListReservation = () => {
  const [reservas, setReservas] = useState([]);
  const [search, setSearch] = useState(""); // Estado para el buscador
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const [confirmId, setConfirmId] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllReservations(token);
        setReservas(data);
      } catch {
        setError("Error al cargar reservas");
      }
    };
    fetchData();
  }, [token]);

  // Filtrar reservas según el texto del buscador
  const filteredReservas = reservas.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      await deleteReservation(id, token);
      setReservas(reservas.filter(r => r.id !== id));
    } catch {
      setError("Error al eliminar reserva");
    } finally {
      setDeletingId(null);
      setConfirmId(null);
    }
  };

  return (
    <div className="admin-crud-page">
      <h3 className="mb-4">Lista de reservas</h3>
      <p className="mb-4">Puedes buscar reservas por nombre.</p>
      <input
        type="text"
        className="form-control"
        placeholder="Buscar por nombre..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <ul className="list-group">
        {filteredReservas.map(r => (
          <li key={r.id} className="list-group-item d-flex justify-content-between align-items-center">
            <span>
              {r.name} - {r.phone} - {r.description} - {new Date(r.date).toLocaleString()}
            </span>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => setConfirmId(r.id)}
              disabled={deletingId === r.id}
            >
              {deletingId === r.id ? "Eliminando..." : "Eliminar"}
            </button>
          </li>
        ))}
      </ul>
      {/* Popup de confirmación */}
      {confirmId && (
        <div className="popup-eliminar-overlay">
          <div className="popup-eliminar">
            <p>¿Seguro que quieres eliminar esta reserva?</p>
            <div className="d-flex justify-content-center gap-2">
              <button className="btn btn-secondary" onClick={() => setConfirmId(null)}>Cancelar</button>
              <button className="btn btn-danger" onClick={() => handleDelete(confirmId)}>Eliminar</button>
            </div>
          </div>
        </div>
      )}
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </div>
  );
};

export default ListReservation;