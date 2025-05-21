import { useEffect, useState } from "react";
import { getAllReservations, deleteReservation } from "../../../servicios/reservasService";
import { useNavigate } from "react-router-dom";
import PopupConfirmacion from "../../../componentes/PopUpConfirmacion/PopUpConfirmacion";
const ListReservation = () => {
  const [reservas, setReservas] = useState([]);
  const [search, setSearch] = useState(""); // Estado para el buscador
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const [confirmId, setConfirmId] = useState(null);
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const data = await getAllReservations(token);
      setReservas(data);
    } catch {
      setError("Error al cargar reservas");
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  // Filtrar reservas según el texto del buscador

function filtrarReservas(reservas, search) {
  return reservas.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase())
  );
}

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

  const filteredReservas = filtrarReservas(reservas, search)

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
      {filteredReservas.length === 0 ? (
        <div className="mt-4"><p>No hay reservas que mostrar.</p></div>
      ) : (
        <ul className="list-group">
          {filteredReservas.map(r => (
            <li key={r.id} className="list-group-item d-flex flex-column align-items-center">
              <span>
                {r.name} - {r.phone} - {r.description} - {new Date(r.date).toLocaleString()}
              </span>
              <div className="d-flex justify-content-center gap-2 mt-2">
                <button
                  className="btn btn-info btn-sm"
                  onClick={() => navigate(`/admin/reservations/edit/${r.id}`)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => setConfirmId(r.id)}
                  disabled={deletingId === r.id}
                >
                  {deletingId === r.id ? "Eliminando..." : "Eliminar"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {/* Popup de confirmación */}
      {confirmId && (
        <PopupConfirmacion
          mensaje="¿Seguro que quieres eliminar esta reserva?"
          onCancel={() => setConfirmId(null)}
          onConfirm={() => handleDelete(confirmId)}
        />
      )}
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </div>
  );
};

export default ListReservation;