import React, { useState } from "react";
import { createReservation } from "../../../servicios/reservasService";

const allowedHours = [
  "13:00", "13:15", "13:30", "13:45",
  "14:00", "14:15", "14:30", "14:45",
  "15:00", "15:15", "15:30", "15:45",
  "20:00", "20:15", "20:30", "20:45",
  "21:00", "21:15", "21:30", "21:45",
  "22:00", "22:15", "22:30", "22:45"
];

const AddReservation = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    description: "",
    date: "", // yyyy-MM-dd (input date)
    time: ""  // HH:mm (from allowedHours)
  });

  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");
    setError("");

    if (!form.date || !form.time) {
      setError("Por favor selecciona fecha y hora");
      return;
    }

    // Combinar fecha y hora para enviar en formato ISO-8601
    const dateTime = form.date + "T" + form.time;

    // Crear objeto con el formato que espera el backend
    const reservationData = {
      name: form.name,
      phone: form.phone,
      description: form.description,
      date: dateTime
    };

    const token = localStorage.getItem("token");

    try {
      await createReservation(reservationData, token);
      setMensaje("Reserva añadida correctamente");
      setForm({ name: "", phone: "", description: "", date: "", time: "" });
    } catch (err) {
      setError(err.message || "Error al añadir reserva");
    }
  };

  return (
    <div className="admin-crud-page">
      <h3>Añadir reserva</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Nombre del cliente</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Teléfono</label>
          <input
            type="text"
            className="form-control"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Descripción</label>
          <textarea
            className="form-control"
            name="description"
            value={form.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Fecha</label>
          <input
            type="date"
            className="form-control"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Hora</label>
          <select
            className="form-control"
            name="time"
            value={form.time}
            onChange={handleChange}
            required
          >
            <option value="">-- Selecciona hora --</option>
            {allowedHours.map(hour => (
              <option key={hour} value={hour}>
                {hour}
              </option>
            ))}
          </select>
        </div>
        <button className="btn btn-success" type="submit">
          Añadir
        </button>
      </form>
      {mensaje && <div className="alert alert-success mt-3">{mensaje}</div>}
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </div>
  );
};

export default AddReservation;
