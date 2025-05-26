import { useState } from "react";
import { deleteReservation } from "../../../servicios/reservasService";

const esCaducada = (fechaReserva) => {
  const ahora = new Date();
  const fecha = new Date(fechaReserva);
  return fecha < ahora;
};

const generarGoogleCalendarLink = (reserva) => {
  const startDate = new Date(reserva.date);
  const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // Duración 1 hora
  const formatDate = (date) => date.toISOString().replace(/[-:]|\.\d{3}/g, "");

  const text = encodeURIComponent(`Reserva ${reserva.name}`);
  const details = encodeURIComponent(reserva.description || "Detalles de la reserva");
  const location = encodeURIComponent(reserva.location || "");
  const dates = `${formatDate(startDate)}/${formatDate(endDate)}`;

  return `https://www.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${dates}&details=${details}&location=${location}&sf=true&output=xml`;
};

const generarICS = (reserva) => {
  const startDate = new Date(reserva.date);
  const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // Duración 1 hora

  const formatDate = (date) => date.toISOString().replace(/[-:]|\.\d{3}/g, "").slice(0, 15) + "Z";

  return `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:Reserva ${reserva.name}
DESCRIPTION:${reserva.description || "Detalles de la reserva"}
LOCATION:${reserva.location || ""}
DTSTART:${formatDate(startDate)}
DTEND:${formatDate(endDate)}
END:VEVENT
END:VCALENDAR`;
};

const ReservasList = ({ reservas, setReservas, popupHandler }) => {
  const [mostrarReservas, setMostrarReservas] = useState(false);
  const [borrando, setBorrando] = useState(null);

  const manejarVerReservas = () => setMostrarReservas(!mostrarReservas);

  const manejarBorrado = async (id) => {
    setBorrando(id);
    try {
      const token = localStorage.getItem('token');
      await deleteReservation(id, token);
      setReservas(prev => prev.filter(r => r.id !== id));
      popupHandler("Reserva borrada con éxito", 2000);
    } catch {
      popupHandler("Error al borrar la reserva", 3000);
    } finally {
      setBorrando(null);
    }
  };

  const descargarICS = (reserva) => {
    const blob = new Blob([generarICS(reserva)], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `reserva-${reserva.id}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="text-center mt-4">
      <button className="btn btn-primary mt-2 mb-2" onClick={manejarVerReservas}>
        {mostrarReservas ? 'Ocultar Reservas' : 'Ver mis Reservas'}
      </button>
      {mostrarReservas && (
        <div className="reservas-container mt-4 mb-4 py-4 px-4">
          <h4 className="reserva-titulo">Mis Reservas</h4>
          {reservas.length > 0 ? (
            reservas.map((reserva) => {
              const caducada = esCaducada(reserva.date);
              return (
                <div
                  key={reserva.id}
                  className={`reserva-card ${caducada ? 'caducada' : 'pendiente'}`}
                >
                  <h5 className="reserva-titulo">Reserva #{reserva.id}</h5>
                  <p><strong>Nombre:</strong> {reserva.name}</p>
                  <p><strong>Descripción:</strong> {reserva.description}</p>
                  <p><strong>Teléfono:</strong> {reserva.phone}</p>
                  <p><strong>Fecha:</strong> {new Date(reserva.date).toLocaleString()}</p>
                  <div className="estado-reserva">
                    <strong>Estado:</strong> {caducada ? (
                      <div>
                        <span className="estado-caducada">Caducada </span>
                        <i className="bi bi-calendar-x estado-caducada"></i>
                      </div>
                    ) : (
                      <div>
                        <span className="estado-pendiente">Pendiente </span>
                        <i className="bi bi-calendar2-check estado-pendiente"></i>
                      </div>
                    )}
                  </div>
                  <button
                    className="btn btn-danger mt-2"
                    onClick={() => manejarBorrado(reserva.id)}
                    disabled={borrando === reserva.id}
                  >
                    <i className="bi bi-trash"></i> Cancelar Reserva
                  </button>

                  {/* 📅 Botón para añadir al calendario */}
                  {!caducada && (
                    <div className="mt-2">
                      <a
                        href={generarGoogleCalendarLink(reserva)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-success me-2"
                      >
                        <i className="bi bi-calendar-plus"></i> Añadir a Google Calendar
                      </a>
                      <button
                        className="btn btn-outline-primary"
                        onClick={() => descargarICS(reserva)}
                      >
                        <i className="bi bi-calendar-plus"></i> Añadir a Calendario (ICS)
                      </button>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <p className="reservas-text">No tienes reservas.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ReservasList;
