import React, { useState, useEffect } from "react";
import { getAllReservations, updateReservation } from "../../../servicios/reservasService";

const EditReservation = () => {
  const [reservas, setReservas] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    description: "",
    date: ""
  });
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

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

  const handleSelect = (e) => {
    const id = e.target.value;
    setSelectedId(id);
    const reserva = reservas.find(r => r._id === id);
    setForm({
      name: reserva?.name || "",
      phone: reserva?.phone || "",
      description: reserva?.description || "",
      date: reserva?.date ? reserva.date.slice(0, 16) : ""
    });
    setMensaje("");
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");
    setError("");
    try {
      await updateReservation(selectedId, form, token);
      setMensaje("Reserva editada correctamente");
    } catch (err) {
      setError(err.message || "Error al editar reserva");
    }
  };

  return (
    <div className="admin-crud-page">
      <h3>Editar reserva</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Selecciona reserva</label>
          <select className="form-control" value={selectedId} onChange={handleSelect} required>
            <option value="">-- Selecciona --</option>
            {reservas.map(r => (
              <option key={r.id} value={r.id}>{r.name} - {r.date}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label>Nombre del cliente</label>
          <input type="text" className="form-control" name="name" value={form.name} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Teléfono</label>
          <input type="text" className="form-control" name="phone" value={form.phone} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Descripción</label>
          <textarea className="form-control" name="description" value={form.description} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Fecha y hora</label>
          <input type="datetime-local" className="form-control" name="date" value={form.date} onChange={handleChange} required />
        </div>
        <button className="btn btn-primary" type="submit" disabled={!selectedId}>Editar</button>
      </form>
      {mensaje && <div className="alert alert-info mt-3">{mensaje}</div>}
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </div>
  );
};

export default EditReservation;