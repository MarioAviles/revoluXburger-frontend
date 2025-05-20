import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { login } from '../../servicios/userService'; // Importa la función del servicio

const Login = ({ setToken }) => {
  const navigate = useNavigate();
  const [popup, setPopup] = useState(null);

  // Maneja el envío del formulario de login
  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    try {
      // Llama al servicio para hacer login
      const data = await login(username, password);
      setToken(data.token);
      setPopup("Inicio de sesión exitoso");
      setTimeout(() => {
        setPopup(null);
        navigate('/panel');
      }, 2000);
    } catch (error) {
      setPopup(error.message);
      setTimeout(() => setPopup(null), 5000);
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
      {popup && (
        <div className="custom-popup">
          {popup}
        </div>
      )}
    </div>
  );
};

export default Login;