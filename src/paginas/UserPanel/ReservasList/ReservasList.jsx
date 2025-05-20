import { useState } from "react";
import { deleteReservation } from "../../../servicios/reservasService";

const esCaducada = (fechaReserva) => {
  const ahora = new Date(); // Fecha y hora actual
  const fecha = new Date(fechaReserva); // Convertir la fecha de la reserva a un objeto Date
  return fecha < ahora; // Compara si la fecha de la reserva es anterior a la fecha actual
};

const ReservasList = ({ reservas, setReservas, popupHandler }) => { 
   // Componente para mostrar la lista de reservas
  const [mostrarReservas, setMostrarReservas] = useState(false); // Estado para mostrar u ocultar reservas
  const [borrando, setBorrando] = useState(null);  // Estado para manejar el ID de la reserva que se está borrando

  const manejarVerReservas = () => setMostrarReservas(!mostrarReservas); // Función para alternar la visibilidad de las reservas

  const manejarBorrado = async (id) => { 
    setBorrando(id); // Establece el ID de la reserva que se está borrando
    try {
      const token = localStorage.getItem('token'); // Obtiene el token del almacenamiento local
      await deleteReservation(id, token); // Llama a la función para borrar la reserva
      setReservas(prev => prev.filter(r => r.id !== id)); // Actualiza el estado de reservas eliminando la reserva borrada
      popupHandler("Reserva borrada con éxito", 2000); // Muestra un mensaje de éxito al borrar la reserva
    } catch {
      popupHandler("Error al borrar la reserva", 3000); // Muestra un mensaje de error si la eliminación falla
    } finally {
      setBorrando(null); // Resetea el estado de borrando
    }
  }; 

  return (
    <div className="text-center mt-4">
      <button
        className="btn btn-primary mt-2 mb-2"
        onClick={manejarVerReservas}
      >
        {mostrarReservas ? 'Ocultar Reservas' : 'Ver mis Reservas'} {/* Cambia el texto del botón según el estado de mostrarReservas */}
      </button>
      {mostrarReservas && (
        <div className="reservas-container mt-4 mb-4 py-4 px-4">
          <h4 className="reserva-titulo">Mis Reservas</h4>
          {reservas.length > 0 ? (
            reservas.map((reserva) => {
              const caducada = esCaducada(reserva.date); // Verifica si la reserva está caducada
              // Si la reserva está caducada, se muestra con un estilo diferente
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
                    onClick={() => manejarBorrado(reserva.id)} // Llama a la función para borrar la reserva
                    disabled={borrando === reserva.id} // Deshabilita el botón si se está borrando esta reserva
                  >
                    <i className="bi bi-trash"></i> Cancelar Reserva
                  </button>
                </div>
              );
            })
          ) : (
            <p className="reservas-text">No tienes reservas.</p> // Mensaje si no hay reservas
          )}
        </div>
      )} 
    </div>
  );
};

export default ReservasList;