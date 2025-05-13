import './Registro.css';
import { Link, useNavigate } from 'react-router-dom';

const Registro = () => {
  const navigate = useNavigate();

  const handleRegistro = async (event) => {
    event.preventDefault();

    // De momento he puesto esta URL pero no funciona
    const response = await fetch('https://revoluxburger-backend.onrender.com/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        name: event.target.name.value,
        email: event.target.email.value,
        password: event.target.password.value,
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await response.json();

    if (data.token) {
      localStorage.setItem('token', data.token); // Guarda el token
      localStorage.setItem('user', JSON.stringify(data.user)); // Guarda los datos del usuario
      navigate('/panel'); // Redirige al panel de usuario
    } else {
      alert('Error al registrarse');
    }
  };

  return (
    <div className="registro container text-center">
      <h1>Regístrate</h1>
      <form onSubmit={handleRegistro} className="text-center align-items-center justify-content-center flex-column">
        <div className="mb-3">
          <label htmlFor="name">Nombre</label>
          <input type="text" id="name" required />
        </div>
        <div className="mb-3">
          <label htmlFor="email">Correo Electrónico</label>
          <input type="email" id="email" required />
        </div>
        <div className="mb-3">
          <label htmlFor="password">Contraseña</label>
          <input type="password" id="password" required />
        </div>
        <button type="submit" className="btn btn-custom">Registrarse</button>
      </form>
      <p>¿Tienes una cuenta? <br /><br /><Link to="/login">Inicia sesión ahora</Link></p>
    </div>
  );
};

export default Registro;