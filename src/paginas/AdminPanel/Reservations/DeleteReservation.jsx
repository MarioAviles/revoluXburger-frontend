import React, { useState, useEffect } from "react";
import { getAllReservations, deleteReservation } from "../../../servicios/reservasService";

const DeleteReservation = () => {
  const token = localStorage.getItem("token");
  const [reservas, setReservas] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [popup, setPopup] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    setPopup(null);
    try {
      const data = await getAllReservations(token);
      setReservas(data);
    } catch {
      setPopup("Error al cargar reservas");
      setTimeout(() => setPopup(null), 3000);
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
    setPopup(null);
    try {
      await deleteReservation(selectedId, token);
      setPopup("Reserva eliminada correctamente");
      setSelectedId("");
      fetchData();
      setTimeout(() => setPopup(null), 3000);
    } catch (err) {
      setPopup(err.message || "Error al eliminar reserva");
      setTimeout(() => setPopup(null), 3000);
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
      {popup && <div className="custom-popup">{popup}</div>}
    </div>
  );
};

export default DeleteReservation;