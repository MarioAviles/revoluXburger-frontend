import React, { useState, useEffect } from "react";
import { getAllReservations, deleteReservation } from "../../../servicios/reservasService";

const DeleteReservation = () => {
  const token = localStorage.getItem("token");
  const [reservas, setReservas] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getAllReservations(token);
      setReservas(data);
    } catch {
      setError("Error al cargar reservas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");
    setError("");
    try {
      await deleteReservation(selectedId, token);
      setMensaje("Reserva eliminada correctamente");
      setSelectedId("");
      fetchData();
    } catch (err) {
      setError(err.message || "Error al eliminar reserva");
    }
  };

  return (
    <div className="admin-crud-page">
      <h3>Eliminar reserva</h3>
      {loading ? <div>Cargando reservas...</div> : (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Selecciona reserva</label>
            <select className="form-control" value={selectedId} onChange={e => setSelectedId(e.target.value)} required>
              <option value="">-- Selecciona --</option>
              {reservas.map(r => (
                <option key={r.id} value={r.id}>{r.name} - {r.date}</option>
              ))}
            </select>
          </div>
          <button className="btn btn-danger w-100" type="submit" disabled={!selectedId}>Eliminar</button>
        </form>
      )}
      {mensaje && <div className="alert alert-info mt-3">{mensaje}</div>}
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </div>
  );
};

export default DeleteReservation;