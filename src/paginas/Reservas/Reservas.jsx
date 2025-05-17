import { useState, useEffect } from "react";
import { createReservation, getAvailableTimes } from "../../servicios/reservasService";

const Reservas = () => {
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

  useEffect(() => {
    const fetchAvailableHours = async () => {
      if (!form.date) {
        setAvailableHours([]);
        return;
      }

      setLoadingHours(true);
      setError("");
      try {
        const token = localStorage.getItem("token");
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
  }, [form.date]);

  const handleChange = (e) => {
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

    const dateTime = `${form.date}T${form.time}`;

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
      setAvailableHours([]);
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

        <button className="btn btn-success" type="submit">
          Añadir
        </button>
      </form>

      {mensaje && <div className="alert alert-success mt-3">{mensaje}</div>}
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </div>
  );
};

export default Reservas;
