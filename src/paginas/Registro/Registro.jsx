import './Registro.css';
import { Link, useNavigate } from 'react-router-dom';

const Registro = () => {
  const navigate = useNavigate();

  const handleRegistro = async (event) => {
    event.preventDefault();

    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    try {
      const response = await fetch('https://revoluxburger-backend.onrender.com/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          username, // Cambié 'name' a 'username'
          email,
          password,
        }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error('Error al registrarse');
      }

      // Si el registro fue exitoso, redirige al login
      alert('Registro exitoso! Ahora puedes iniciar sesión');
      navigate('/login');
    } catch (error) {
      alert(error.message);
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
    </div>
  );
};

export default Registro;
