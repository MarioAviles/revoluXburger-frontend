import React, { useState, useEffect } from "react";
import { getAllReservations, updateReservation, getAvailableTimes } from "../../servicios/reservasService";
import { useParams, useNavigate } from "react-router-dom";

const EditReservation = () => {
  const navigate = useNavigate();
  const { reservationId } = useParams();
  const [ reservas, setReservas ] = useState([]);
  const [ selectedId, setSelectedId ] = useState("");
  const [ form, setForm ] = useState({
    name: "",
    phone: "",
    description: "",
    date: "",
    time: ""
  });

  const [ availableHours, setAvailableHours ] = useState([]);
  const [ loadingHours, setLoadingHours ] = useState(false);
  const [ popup, setPopup ] = useState(null);

  const token = localStorage.getItem("token");

  const fetchData = async () => {
    try {
      const data = await getAllReservations(token);
      setReservas(data);
    } catch {
      setPopup("Error al cargar reservas");
      setTimeout(() => setPopup(null), 3000);
    }
  };

  useEffect(() => {
    fetchData();
  }, [ token ]);

  useEffect(() => {
    const fetchAvailableHours = async () => {
      if (!form.date) {
        setAvailableHours([]);
        return;
      }

      setLoadingHours(true);
      setPopup(null);
      try {
        const hours = await getAvailableTimes(form.date, token);

        // Filtrar horas para mostrar solo las futuras si la fecha es hoy
        const filteredHours = hours.filter(hour => {
          if (form.date === new Date().toISOString().split("T")[ 0 ]) {
            const currentHour = new Date().getHours();
            const currentMinute = new Date().getMinutes();
            const [ hourPart, minutePart ] = hour.split(":").map(Number);
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
  }, [ form.date, token ]);

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
    setPopup(null);
  };

  const handleChange = (e) => {
    setForm({ ...form, [ e.target.name ]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPopup(null);

    // Validar teléfono
    if (!/^[679]\d{8}$/.test(form.phone)) {
      setPopup("El teléfono debe comenzar con 6, 7 o 9 y tener 9 dígitos.");
      setTimeout(() => setPopup(null), 3000);
      return;
    }

    if (!form.date || !form.time) {
      setPopup("Por favor selecciona fecha y hora");
      setTimeout(() => setPopup(null), 3000);
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
      setPopup("Reserva editada correctamente");
      setTimeout(() => setPopup(null), 3000);
      navigate(`/admin-panel`);
    } catch (err) {
      setPopup(err.message || "Error al editar reserva");
      setTimeout(() => setPopup(null), 3000);
    }
  };

  useEffect(() => {
    if (reservationId && reservas.length > 0) {
      setSelectedId(reservationId);
      const reserva = reservas.find(r => String(r.id) === String(reservationId));
      setForm({
        name: reserva?.name || "",
        phone: reserva?.phone || "",
        description: reserva?.description || "",
        date: reserva?.date ? reserva.date.slice(0, 10) : "",
        time: reserva?.date ? reserva.date.slice(11, 16) : ""
      });
      setPopup(null);
    }
  }, [ reservationId, reservas ]);

  return (
    <div className="admin-crud-page">
      <h3>Editar reserva</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Selecciona reserva</label>
          <select className="form-control" value={selectedId} onChange={handleSelect} required>
            <option value="">-- Selecciona --</option>
            {reservas.map((r) => (
              <option key={r.id} value={r.id}>
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
            pattern="[679][0-9]{8}" // Validación HTML
            title="El teléfono debe comenzar con 6, 7 o 9 y tener 9 dígitos."
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
            min={new Date().toISOString().split("T")[ 0 ]} // Bloquea días anteriores
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
        <div className="mb-3">
          <label>Número de personas</label>
          <input
            type="number"
            className="form-control"
            name="numberOfPersons"
            value={form.numberOfPersons || ""}
            onChange={(e) => setForm({ ...form, numberOfPersons: Number(e.target.value) })}
            min={1}
            max={20}
            required
          />
        </div>

        <button className="btn btn-primary w-100" type="submit" disabled={!selectedId}>
          Editar
        </button>
      </form>
      {popup && <div className="custom-popup">{popup}</div>}
    </div>
  );
};

export default EditReservation;