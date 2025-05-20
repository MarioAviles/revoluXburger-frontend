import { useState, useEffect } from "react";
import { createReservation, getAvailableTimes } from "../../servicios/reservasService";

const Reservas = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    description: "",
    date: "",
    time: ""
  }); // Estado para manejar el formulario

  const [availableHours, setAvailableHours] = useState([]); // Estado para manejar las horas disponibles
  const [loadingHours, setLoadingHours] = useState(false); // Estado para manejar la carga de horas
  const [popup, setPopup] = useState(""); // Estado para manejar el popup

  useEffect(() => {
    const fetchAvailableHours = async () => { 
      if (!form.date) {
        setAvailableHours([]); {/* Si no hay fecha seleccionada, no se cargan horas disponibles */ }
        return;
      }

      setLoadingHours(true); // Carga de horas
      setPopup(""); 
      try {
        const token = localStorage.getItem("token");
        const hours = await getAvailableTimes(form.date, token); {/* Llama a la función para obtener horas disponibles */ }
        setAvailableHours(hours); {/* Actualiza el estado con las horas disponibles */ }
      } catch (err) {
        setPopup(err.message || "Error al cargar horas disponibles");
        setTimeout(() => setPopup(""), 3000);
        setAvailableHours([]);
      } finally {
        setLoadingHours(false); {/* Finaliza la carga de horas */ }
      }
    };

    fetchAvailableHours();
  }, [form.date]); {/* Efecto para cargar horas disponibles cuando cambia la fecha */ }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => { {/* Maneja el envío del formulario */ }
    e.preventDefault();
    setPopup("");

    if (!form.date || !form.time) {
      setPopup("Por favor selecciona fecha y hora");
      setTimeout(() => setPopup(""), 3000);
      return;
    }

    const dateTime = `${form.date}T${form.time}`; {/* Combina fecha y hora en un solo string */ }

    const reservationData = { 
      name: form.name,
      phone: form.phone,
      description: form.description, 
      date: dateTime
    }; {/* Datos de la reserva */ }

    const token = localStorage.getItem("token");

    try { {/* Llama a la función para crear la reserva */ }
      await createReservation(reservationData, token); {/* Crea la reserva */ }
      setPopup("Reserva añadida correctamente");
      setForm({ name: "", phone: "", description: "", date: "", time: "" }); {/* Resetea el formulario */ }
      setAvailableHours([]); {/* Limpia las horas disponibles */ }
      setTimeout(() => setPopup(""), 3000);
    } catch (err) {
      setPopup(err.message || "Error al añadir reserva");
      setTimeout(() => setPopup(""), 3000); 
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

        <button className="btn btn-success w-100" type="submit">
          Añadir
        </button>
      </form>

      {popup && <div className="custom-popup">{popup}</div>}
    </div>
  );
};

export default Reservas;