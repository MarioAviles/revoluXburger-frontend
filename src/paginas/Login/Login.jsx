import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { login } from '../../servicios/userService';
import { useState } from 'react';
const Login = ({ setToken }) => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [popup, setPopup] = useState(null);

  const onSubmit = async (data) => {
    try {
      const { username, password } = data;
      const response = await login(username, password);
      setToken(response.token);
      setPopup("Inicio de sesión exitoso");
      setTimeout(() => {
        setPopup(null);
        navigate('/panel');
      }, 2000);
    } catch (error) {
      setPopup(error.message || "Error al iniciar sesión");
      setTimeout(() => setPopup(null), 5000);
    }
  };

  return (
    <div className="login-container text-center">
      <h1>Iniciar Sesión</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="text-center align-items-center justify-content-center flex-column">
        <div className="mb-3">
          <label htmlFor="username">Nombre de usuario</label>
          <input
            type="text"
            id="username"
            className="form-control"
            {...register("username", { required: "El nombre de usuario es obligatorio" })}
          />
          {errors.username && <small className="text-danger">{errors.username.message}</small>}
        </div>
        <div className="mb-3">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            className="form-control"
            {...register("password", { required: "La contraseña es obligatoria" })}
          />
          {errors.password && <small className="text-danger">{errors.password.message}</small>}
        </div>
        <button type="submit" className="btn btn-custom">Iniciar sesión</button>
      </form>
      <p className='textoLogin'>¿No tienes una cuenta? <br /><Link className='enlaceLogin' to="/registro">Haz click y regístrate ahora</Link></p>
      <br /><p className='textoLogin'>¿Olvidaste tu contraseña?<br /><Link className='enlaceLogin' to="/forgot-password">Haz click y restablecela</Link></p>
      {popup && (
        <div className="custom-popup">
          {popup}
        </div>
      )}
    </div>
  );
};

export default Login;