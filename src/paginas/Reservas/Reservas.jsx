import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { createReservation, getAvailableTimes } from "../../servicios/reservasService";
import useAuthenticatedUser from "../../hooks/useAuthenticatedUser";

const Reservas = () => {
  const { register, handleSubmit, watch, setValue, reset, formState: { errors } } = useForm();
  const [availableHours, setAvailableHours] = useState([]);
  const [loadingHours, setLoadingHours] = useState(false);
  const [popup, setPopup] = useState("");

  const { user, loading: loadingUser } = useAuthenticatedUser(); // Obtener usuario autenticado
  const watchDate = watch("date"); // Observa el campo de fecha

  // Establecer el email del usuario autenticado en el formulario
  useEffect(() => {
    if (user && user.email) {
      setValue("email", user.email); // Rellenar el campo de email
    }
  }, [user, setValue]);

  useEffect(() => {
    const fetchAvailableHours = async () => {
      if (!watchDate) {
        setAvailableHours([]);
        return;
      }

      setLoadingHours(true);
      setPopup("");
      try {
        const token = localStorage.getItem("token");
        const hours = await getAvailableTimes(watchDate, token);
        setAvailableHours(hours);
      } catch (err) {
        setPopup(err.message || "Error al cargar horas disponibles");
        setTimeout(() => setPopup(""), 3000);
        setAvailableHours([]);
      } finally {
        setLoadingHours(false);
      }
    };

    fetchAvailableHours();
  }, [watchDate]);

  const onSubmit = async (data) => {
    setPopup("");

    const dateTime = `${data.date}T${data.time}`;
    const reservationData = {
      name: data.name,
      phone: data.phone,
      email: data.email,
      description: data.description,
      date: dateTime,
      numberOfPersons: data.numberOfPersons,
    };

    const token = localStorage.getItem("token");

    try {
      await createReservation(reservationData, token);
      setPopup("Reserva añadida correctamente");
      reset();
      setAvailableHours([]);
      setTimeout(() => setPopup(""), 3000);
    } catch (err) {
      setPopup(err.message || "Error al añadir reserva");
      setTimeout(() => setPopup(""), 3000);
    }
  };

  return (
    <div className="admin-crud-page">
      <h3>Añadir reserva</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label>Nombre del cliente</label>
          <input
            type="text"
            className="form-control"
            {...register("name", { required: "El nombre es obligatorio" })}
          />
          {errors.name && <small className="text-danger">{errors.name.message}</small>}
        </div>

        <div className="mb-3">
          <label>Teléfono</label>
          <input
            type="text"
            className="form-control"
            {...register("phone", {
              required: "El teléfono es obligatorio",
              pattern: {
                value: /^[679]\d{8}$/,
                message: "El teléfono debe comenzar con 6, 7 o 9 y tener 9 dígitos",
              },
            })}
          />
          {errors.phone && <small className="text-danger">{errors.phone.message}</small>}
        </div>

        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            {...register("email", {
              required: "El email es obligatorio",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Introduce un email válido",
              },
            })}
          />
          {errors.email && <small className="text-danger">{errors.email.message}</small>}
        </div>

        <div className="mb-3">
          <label>Descripción</label>
          <textarea
            className="form-control"
            {...register("description", { required: "La descripción es obligatoria" })}
          />
          {errors.description && <small className="text-danger">{errors.description.message}</small>}
        </div>

        <div className="mb-3">
          <label>Fecha</label>
          <input
            type="date"
            className="form-control"
            {...register("date", { required: "La fecha es obligatoria" })}
            min={new Date().toISOString().split("T")[0]} // Bloquea días anteriores
          />

          {errors.date && <small className="text-danger">{errors.date.message}</small>}

        </div>

        <div className="mb-3">
          <label>Hora</label>
          <select
            className="form-control"
            {...register("time", { required: "La hora es obligatoria" })}
            disabled={loadingHours || (watchDate && availableHours.length === 0)}
          >
            {!watchDate && (
              <option value="" hidden>
                -- Selecciona una fecha primero --
              </option>
            )}
            {watchDate && !loadingHours && availableHours.length === 0 && (
              <option value="" disabled>
                No hay horas disponibles
              </option>
            )}
            {watchDate && !loadingHours && availableHours.length > 0 && (
              <>
                <option value="">-- Selecciona hora --</option>
                {availableHours
                  .filter(hour => {
                    if (watchDate === new Date().toISOString().split("T")[0]) {
                      const currentHour = new Date().getHours();
                      const currentMinute = new Date().getMinutes();
                      const [hourPart, minutePart] = hour.split(":").map(Number);
                      return hourPart > currentHour || (hourPart === currentHour && minutePart > currentMinute);
                    }
                    return true;
                  })
                  .map(hour => (
                    <option key={hour} value={hour}>
                      {hour}
                    </option>
                  ))}
              </>
            )}
          </select>
          {errors.time && <small className="text-danger">{errors.time.message}</small>}
          {loadingHours && <small>Cargando horas disponibles...</small>}
        </div>

        <div className="mb-3">
          <label>Número de personas</label>
          <input
            type="number"
            className="form-control"
            min={1}
            max={20}
            {...register("numberOfPersons", {
              required: "El número de personas es obligatorio",
              min: { value: 1, message: "Mínimo 1 persona" },
              max: { value: 20, message: "Máximo 20 personas" }
            })}
          />
          {errors.numberOfPersons && <small className="text-danger">{errors.numberOfPersons.message}</small>}
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