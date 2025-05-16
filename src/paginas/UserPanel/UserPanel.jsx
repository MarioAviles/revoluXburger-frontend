import './UserPanel.css';
import useAuthenticatedUser from '../../hooks/useAuthenticatedUser';
import { useNavigate } from 'react-router-dom';

const UserPanel = () => {
  const { user, loading } = useAuthenticatedUser();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="user-panel container py-5">
        <h1 className="text-center">Cargando...</h1>
      </div>
    );
  }

  if (!loading && !user) {
    navigate('/login');
  }

  const usuario = Array.isArray(user) ? user[0] : user;

  return (
    <div className="user-panel container py-5">
      <h1 className="text-center">Bienvenido, {usuario?.username || 'Usuario'}</h1>
      <div className="row">
        <div className="col-12 col-md-6">
          <p><strong>Email:</strong> {usuario?.email}</p>
          <p><strong>Rol:</strong> {usuario?.role}</p>
          <p><strong>Puntos:</strong> {usuario?.points}</p>
        </div>
        <div className="col-12 col-md-6">
          <button
            className="btn btn-danger"
            onClick={() => {
              localStorage.clear(); //Quita el token del localStorage
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