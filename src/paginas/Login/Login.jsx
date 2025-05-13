import './Login.css';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    // De momento he puesto esta URL pero no funciona
    const response = await fetch('https://revoluxburger-backend.onrender.com/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        name: event.target.name.value,
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
      alert('Credenciales incorrectas');
    }
  };

  return (
    <div className="login container text-center">
      <h1>Iniciar Sesión</h1>
      <form onSubmit={handleLogin} className="text-center align-items-center justify-content-center flex-column">
        <div className="mb-3">
          <label htmlFor="name">Nombre de usuario</label>
          <input type="name" id="name" required />
        </div>
        <div className="mb-3">
          <label htmlFor="password">Contraseña</label>
          <input type="password" id="password" required />
        </div>
        <button type="submit" className="btn btn-custom">Iniciar sesión</button>
      </form>
      <p>¿No tienes una cuenta? <br /><br /><Link to="/registro">Haz click y regístrate ahora</Link></p>
    </div>
  );
};

export default Login;