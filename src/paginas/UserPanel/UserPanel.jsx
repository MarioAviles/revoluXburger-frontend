import './UserPanel.css';

const UserPanel = () => {
  const user = JSON.parse(localStorage.getItem('user')); // Obtén los datos del usuario desde el almacenamiento local

  return (
    <div className="user-panel container py-5">
      <h1 className="text-center">Bienvenido, {user?.name || 'Usuario'}</h1>
      <div className="row">
        <div className="col-12 col-md-6">
          <p><strong>Email:</strong> {user?.email}</p>
        </div>
        <div className="col-12 col-md-6">
          <button
            className="btn btn-danger"
            onClick={() => {
              localStorage.clear(); // Limpia el almacenamiento local
              window.location.href = '/login'; // Redirige al login
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