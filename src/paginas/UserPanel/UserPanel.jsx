import './UserPanel.css';
import useAuthenticatedUser from '../../hooks/useAuthenticatedUser';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AjaxLoader from '../../componentes/AjaxLoader/AjaxLoader';
import { deleteReservation } from '../../servicios/reservasService';

const UserPanel = ({ setToken }) => {
  const { user, loading } = useAuthenticatedUser();
  const navigate = useNavigate();
  const [mostrarReservas, setMostrarReservas] = useState(false);
  const [reservas, setReservas] = useState(user?.reservations || []);
  const [borrando, setBorrando] = useState(null);
  const [popup, setPopup] = useState(null); // Estado para el popup

  useEffect(() => {
    setReservas(user?.reservations || []);
  }, [user]);

  useEffect(() => {
    if (!loading && !user) {
      setToken(null);
      navigate('/login', { replace: true });
    }
  }, [loading, user, setToken, navigate]);

  const manejarVerReservas = () => {
    setMostrarReservas(!mostrarReservas);
  };

  const manejarBorrado = async (id) => {
    setBorrando(id);
    try {
      const token = localStorage.getItem('token');
      await deleteReservation(id, token);
      setReservas(reservas.filter(r => r.id !== id));
      setPopup("Reserva borrada con éxito");
      setTimeout(() => {
        setPopup(null);
      }, 2000); // Popup visible por 2 segundos
    } catch (err) {
      setPopup("Error al borrar la reserva");
      setTimeout(() => setPopup(null), 3000);
    } finally {
      setBorrando(null);
    }
  };

  const esCaducada = (fechaReserva) => {
    const ahora = new Date();
    const fecha = new Date(fechaReserva);
    return fecha < ahora;
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
        <div className="text-center mt-4">
          <button
            className="btn btn-primary mt-2 mb-2"
            onClick={manejarVerReservas}
          >
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
      {popup && (
        <div className="custom-popup">
          {popup}
        </div>
      )}
    </div>
  );
};

export default UserPanel;