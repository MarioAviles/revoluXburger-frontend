import './UserPanel.css';
import useAuthenticatedUser from '../../hooks/useAuthenticatedUser';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const UserPanel = ({ setToken }) => {
  const { user, loading } = useAuthenticatedUser();
  const navigate = useNavigate();

  useEffect(() => {
    // Si terminó de cargar y no hay usuario válido, elimina el token y redirige
    if (!loading && !user) {
      setToken(null);
      navigate('/login', { replace: true });
    }
  }, [loading, user, setToken, navigate]);

  if (loading || !user) {
    return (
      <div className="user-panel container py-5">
        <h1 className="text-center">Cargando...</h1>
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
      <button
        className="btn btn-danger mt-2"
        onClick={() => {
          setToken(null); // Limpia el token global y localStorage
          navigate('/login');
        }}
      >
        Cerrar Sesión
      </button>
    </div>
  );
};

export default UserPanel;