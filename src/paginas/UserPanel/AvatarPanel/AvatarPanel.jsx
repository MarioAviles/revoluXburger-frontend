const AvatarPanel = ({ username }) => (
  <div className="avatar-container mb-3">
    <span className="avatar-icon d-flex justify-content-center align-items-center bg-dark">
      <i className="bi bi-person-circle"></i>
    </span>
    <h1 className="text-center mb-3">Bienvenido, {username || 'Usuario'}</h1> {/* Icono de usuario */}
    <p className="text-center">Aquí puedes gestionar tus reservas y tu información personal.</p>
  </div>
);

export default AvatarPanel;