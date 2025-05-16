import React, { useState } from "react";
import { createReservation } from "../../../servicios/reservasService";

const AddReservation = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    description: "",
    date: ""
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
    const token = localStorage.getItem("token");
    try {
      await createReservation(form, token);
      setMensaje("Reserva añadida correctamente");
      setForm({ name: "", phone: "", description: "", date: "" });
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
        <button className="btn btn-success" type="submit">Añadir</button>
      </form>
      {mensaje && <div className="alert alert-success mt-3">{mensaje}</div>}
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </div>
  );
};

export default AddReservation;