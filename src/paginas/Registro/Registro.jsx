import './Registro.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { register } from '../../servicios/userService'; // Importa la función del servicio

const Registro = () => {
  const navigate = useNavigate();
  const [popup, setPopup] = useState(null);

  // Maneja el envío del formulario de registro
  const handleRegistro = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    try {
      // Llama al servicio para registrar usuario
      await register({ username, email, password });
      setPopup("Registro exitoso. Ahora puedes iniciar sesión");
      setTimeout(() => {
        setPopup(null);
        navigate('/login');
      }, 2000);
    } catch (error) {
      setPopup(error.message);
      setTimeout(() => setPopup(null), 5000);
    }
  };

  return (
    <div className="registro-container text-center">
      <h1>Regístrate</h1>
      <form onSubmit={handleRegistro} className="text-center align-items-center justify-content-center flex-column">
        <div className="mb-3">
          <label htmlFor="username">Nombre de usuario</label>
          <input type="text" id="username" name="username" required />
        </div>
        <div className="mb-3">
          <label htmlFor="email">Correo Electrónico</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className="mb-3">
          <label htmlFor="password">Contraseña</label>
          <input type="password" id="password" name="password" required />
        </div>
        <button type="submit" className="btn-custom">Registrarse</button>
      </form>
      <p>¿Ya tienes una cuenta? <br /><br /><Link to="/login">Inicia sesión ahora</Link></p>
      {popup && (
        <div className="custom-popup">
          {popup}
        </div>
      )}
    </div>
  );
};

export default Registro;