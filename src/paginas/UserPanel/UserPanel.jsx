import './UserPanel.css';
import useAuthenticatedUser from '../../hooks/useAuthenticatedUser';
import { useNavigate } from 'react-router-dom';

const UserPanel = () => {
  const { user, loading, error } = useAuthenticatedUser();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="user-panel container py-5">
        <h1 className="text-center">Cargando...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="user-panel container py-5">
        <h1 className="text-center">Error</h1>
        <p className="text-center">{error}</p>
      </div>
    );
  }

  if (!loading && !user) {
    navigate('/login');
  }

  return (
    <div className="user-panel container py-5">
      <h1 className="text-center">Bienvenido, {user?.username || 'Usuario'}</h1>
      <div className="row">
        <div className="col-12 col-md-6">
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Rol:</strong> {user?.role}</p>
          <p><strong>Puntos:</strong> {user?.points}</p>
        </div>
        <div className="col-12 col-md-6">
          <button
            className="btn btn-danger"
            onClick={() => {
              localStorage.clear(); // Limpia el almacenamiento local
              navigate('/login'); // Redirige al login
            }}
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserPanel;