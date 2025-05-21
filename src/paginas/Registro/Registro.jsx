import './Registro.css';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { register as registerUser } from '../../servicios/userService';
import { useState } from 'react';
const Registro = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [popup, setPopup] = useState(null);

  const onSubmit = async (data) => {
    try {
      const { username, email, password } = data;
      await registerUser({ username, email, password });
      setPopup("Registro exitoso. Ahora puedes iniciar sesión");
      setTimeout(() => {
        setPopup(null);
        navigate('/login');
      }, 2000);
    } catch (error) {
      setPopup(error.message || "Error al registrarse");
      setTimeout(() => setPopup(null), 5000);
    }
  };

  return (
    <div className="registro-container text-center">
      <h1>Regístrate</h1>
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
          <label htmlFor="email">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            className="form-control"
            {...register("email", {
              required: "El correo electrónico es obligatorio",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "El correo electrónico no es válido",
              },
            })}
          />
          {errors.email && <small className="text-danger">{errors.email.message}</small>}
        </div>
        <div className="mb-3">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            className="form-control"
            {...register("password", {
              required: "La contraseña es obligatoria",
              minLength: {
                value: 6,
                message: "La contraseña debe tener al menos 6 caracteres",
              },
            })}
          />
          {errors.password && <small className="text-danger">{errors.password.message}</small>}
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