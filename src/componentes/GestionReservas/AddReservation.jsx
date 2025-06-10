import React, { useState, useEffect } from "react";
import { createReservation, getAvailableTimes } from "../../servicios/reservasService";
import { useNavigate } from "react-router-dom";

const AddReservation = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "", // Añadido
    description: "",
    date: "",
    time: "",
    numberOfPersons: ""
  });

  const [availableHours, setAvailableHours] = useState([]);
  const [loadingHours, setLoadingHours] = useState(false);
  const [popup, setPopup] = useState(null);

  useEffect(() => {
    const fetchAvailableHours = async () => {
      if (!form.date) {
        setAvailableHours([]);
        return;
      }

      setLoadingHours(true);
      setPopup(null);
      try {
        const token = localStorage.getItem("token");
        const hours = await getAvailableTimes(form.date, token);

        if (!Array.isArray(hours)) {
          throw new Error("El servidor devolvió un formato inesperado");
        }

        const filteredHours = hours.filter(hour => {
          if (form.date === new Date().toISOString().split("T")[0]) {
            const currentHour = new Date().getHours();
            const currentMinute = new Date().getMinutes();
            const [hourPart, minutePart] = hour.split(":").map(Number);
            return hourPart > currentHour || (hourPart === currentHour && minutePart > currentMinute);
          }
          return true; // Si no es hoy, mostrar todas las horas
        });

        setAvailableHours(filteredHours);
      } catch (err) {
        setPopup(err.message || "Error al cargar horas disponibles");
        setAvailableHours([]);
        setTimeout(() => setPopup(null), 3000);
      } finally {
        setLoadingHours(false);
      }
    };

    fetchAvailableHours();
  }, [form.date]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPopup(null);

    if (!form.date || !form.time) {
      setPopup("Por favor selecciona fecha y hora");
      setTimeout(() => setPopup(null), 3000);
      return;
    }

    const dateTime = `${form.date}T${form.time}`;

    const reservationData = {
      name: form.name,
      phone: form.phone,
      email: form.email, // Añadido
      description: form.description,
      date: dateTime,
      numberOfPersons: form.numberOfPersons
    };

    const token = localStorage.getItem("token");

    try {
      await createReservation(reservationData, token);
      setPopup("Reserva añadida correctamente");
      setForm({ name: "", phone: "", email: "", description: "", date: "", time: "" });
      setAvailableHours([]);
      setTimeout(() => setPopup(null), 3000);
      navigate(`/admin-panel`);
    } catch (err) {
      setPopup(err.message || "Error al añadir reserva");
      setTimeout(() => setPopup(null), 3000);
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
            pattern="[679][0-9]{8}" // Validación HTML
            title="El teléfono debe comenzar con 6, 7 o 9 y tener 9 dígitos."
          />
        </div>

        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={form.email || ""}
            onChange={handleChange}
            required
            pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
            title="Introduce un email válido"
          />
        </div>

        <div className="mb-3">
          <label>Descripción</label>
          <textarea
            className="form-control"
            name="description"
            value={form.description}
            onChange={handleChange}
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
            min={new Date().toISOString().split("T")[0]} // Bloquea días anteriores
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
                {availableHours.map(hour => (
                  <option key={hour} value={hour}>
                    {hour}
                  </option>
                ))}
              </>
            )}
          </select>
          {loadingHours && <small>Cargando horas disponibles...</small>}
        </div>

        <div className="mb-3">
          <label>Número de personas</label>
          <input
            type="number"
            className="form-control"
            name="numberOfPersons"
            value={form.numberOfPersons || ""}
            onChange={handleChange}
            min={1}
            max={20}
            required
          />
        </div>

        <button className="btn btn-success w-100" type="submit">
          Añadir
        </button>
      </form>
      {popup && <div className="custom-popup">{popup}</div>}
    </div>
  );
};

export default AddReservation;