import React, { useState, useEffect } from "react";
import { getAllReservations, updateReservation, getAvailableTimes } from "../../../servicios/reservasService";

const EditReservation = () => {
  const [reservas, setReservas] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    description: "",
    date: "",
    time: ""
  });
  const [availableHours, setAvailableHours] = useState([]);
  const [loadingHours, setLoadingHours] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  // Cargar todas las reservas
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

  // Cargar horas disponibles al cambiar la fecha
  useEffect(() => {
    const fetchAvailableHours = async () => {
      if (!form.date) {
        setAvailableHours([]);
        return;
      }

      setLoadingHours(true);
      setError("");
      try {
        const hours = await getAvailableTimes(form.date, token);
        setAvailableHours(hours);
      } catch (err) {
        setError(err.message || "Error al cargar horas disponibles");
        setAvailableHours([]);
      } finally {
        setLoadingHours(false);
      }
    };

    fetchAvailableHours();
  }, [form.date, token]);

  // Manejar selección de reserva
  const handleSelect = (e) => {
    const id = e.target.value;
    setSelectedId(id);
    const reserva = reservas.find((r) => String(r.id) === String(id) || String(r._id) === String(id));
    setForm({
      name: reserva?.name || "",
      phone: reserva?.phone || "",
      description: reserva?.description || "",
      date: reserva?.date ? reserva.date.slice(0, 10) : "",
      time: reserva?.date ? reserva.date.slice(11, 16) : ""
    });
    setMensaje("");
    setError("");
  };

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");
    setError("");

    if (!form.date || !form.time) {
      setError("Por favor selecciona fecha y hora");
      return;
    }

    const dateTime = `${form.date}T${form.time}`;

    const updatedReservation = {
      name: form.name,
      phone: form.phone,
      description: form.description,
      date: dateTime
    };

    try {
      await updateReservation(selectedId, updatedReservation, token);
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
            {reservas.map((r) => (
              <option key={r.id || r._id} value={r.id || r._id}>
                {r.name} - {new Date(r.date).toLocaleString()}
              </option>
            ))}
          </select>
        </div>

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
            disabled={loadingHours || (form.date && availableHours.length === 0)}
          >
            {!form.date && (
              <option value="" hidden>
                -- Selecciona una fecha primero --
              </option>
            )}
            {form.date && !loadingHours && availableHours.length === 0 && (
              <option value="" disabled>
                No hay horas disponibles
              </option>
            )}
            {form.date && !loadingHours && availableHours.length > 0 && (
              <>
                <option value="">-- Selecciona hora --</option>
                {availableHours.map((hour) => (
                  <option key={hour} value={hour}>
                    {hour}
                  </option>
                ))}
              </>
            )}
          </select>
          {loadingHours && <small>Cargando horas disponibles...</small>}
        </div>

        <button className="btn btn-primary w-100" type="submit" disabled={!selectedId}>
          Editar
        </button>
      </form>

      {mensaje && <div className="alert alert-success mt-3">{mensaje}</div>}
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </div>
  );
};

export default EditReservation;