import './UserPanel.css';
import useAuthenticatedUser from '../../hooks/useAuthenticatedUser';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AjaxLoader from '../../componentes/AjaxLoader/AjaxLoader';

const UserPanel = ({ setToken }) => {
  const { user, loading } = useAuthenticatedUser();
  const navigate = useNavigate();
  const [mostrarReservas, setMostrarReservas] = useState(false); // Estado para mostrar/ocultar reservas

  useEffect(() => {
    if (!loading && !user) {
      setToken(null);
      navigate('/login', { replace: true });
    }
  }, [loading, user, setToken, navigate]);

  const manejarVerReservas = () => {
    setMostrarReservas(!mostrarReservas); // Alternar entre mostrar/ocultar
  };

  // Lógica para determinar si una reserva está caducada
  const esCaducada = (fechaReserva) => {
    const ahora = new Date();
    const fecha = new Date(fechaReserva);
    return fecha < ahora; // Devuelve true si la reserva ya pasó
  };

  if (loading || !user) {
    return (
      <div className="user-panel container py-5">
        <h1 className="text-center"><AjaxLoader /></h1>
      </div>
    );
  }

  return (
    <div className="user-panel container py-5 d-flex flex-column align-items-center">
      <div className="avatar-container mb-3">
        <span className="avatar-icon d-flex justify-content-center align-items-center bg-dark">
          <i className="bi bi-person-circle" style={{ fontSize: "5rem", color: "#FCB300" }}></i>
        </span>
      </div>
      <h1 className="text-center mb-3">Bienvenido, {user.username || 'Usuario'}</h1>
      <div className="user-info-box p-4 mb-4">
        <div className="mb-2">
          <span className="user-label">Email:</span>
          <span className="user-value">{user.email}</span>
        </div>
        <div className="mb-2">
          <span className="user-label">Puntos:</span>
          <span className="user-value">{user.points}</span>
        </div>
      </div>
      {user.role === "ADMIN" && (
        <button
          className="btn btn-warning mt-2 mb-2"
          onClick={() => window.location.href = '/admin-panel'}
        >
          Ir al Panel de Administración
        </button>
      )}
      {user.role === "USER" && (
        <div className=" text-center mt-4">
          <button
            className="btn btn-primary mt-2 mb-2"
            onClick={manejarVerReservas}
          >
            {mostrarReservas ? 'Ocultar Reservas' : 'Ver mis Reservas'}
          </button>
          {mostrarReservas && (
            <div className=" reservas-container mt-4 mb-4 py-4 px-4">
              <h4 className="reserva-titulo">Mis Reservas</h4>
              {user.reservations.length > 0 ? (
                user.reservations.map((reserva) => {
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
                    </div>
                  );
                })
              ) : (
                <p className="reservas-text">No tienes reservas.</p>
              )}
            </div>
          )}
        </div>
      )}
      <button
        className="btn btn-danger mt-2"
        onClick={() => {
          setToken(null);
          navigate('/login');
        }}
      >
        Cerrar Sesión
      </button>
    </div>
  );
};

export default UserPanel;