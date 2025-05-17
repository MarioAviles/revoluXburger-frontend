import './Login.css';
import { Link, useNavigate } from 'react-router-dom';

const Login = ({ setToken }) => {
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    const username = event.target.username.value;
    const password = event.target.password.value;

    try {
      const response = await fetch('https://revoluxburger-backend.onrender.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Credenciales incorrectas');
      }

      const data = await response.json();

      setToken(data.token); // Actualiza el estado global del token
      navigate('/panel');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="login-container text-center">
      <h1>Iniciar Sesión</h1>
      <form onSubmit={handleLogin} className="text-center align-items-center justify-content-center flex-column">
        <div className="mb-3">
          <label htmlFor="username">Nombre de usuario</label>
          <input type="text" id="username" name="username" required />
        </div>
        <div className="mb-3">
          <label htmlFor="password">Contraseña</label>
          <input type="password" id="password" name="password" required />
        </div>
        <button type="submit" className="btn btn-custom">Iniciar sesión</button>
      </form>
      <p>¿No tienes una cuenta? <br /><br /><Link to="/registro">Haz click y regístrate ahora</Link></p>
    </div>
  );
};

export default Login;