import React, { useState } from 'react';
import './ForgotPassword.css';
import { forgotPassword } from '../../servicios/userService';
import { useForm } from 'react-hook-form';

const ForgotPassword = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [message, setMessage] = useState(null);

  const onSubmit = async (data) => {
    try {
      const { email } = data;
      const response = await forgotPassword(email);
      setMessage("Se ha enviado un correo para restablecer tu contraseña.");
    } catch (error) {
      setMessage(error.message || "Error al enviar el correo de recuperación.");
    }
  };

  return (
    <div className="forgot-password-container text-center">
      <h2 className='titulo'>Recuperar Contraseña</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="forgot-password-form">
        <div className="mb-3">
          <label className='texto-password' htmlFor="email">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            className="form-control"
            {...register("email", { required: "El correo electrónico es obligatorio" })}
          />
          {errors.email && <small className="text-danger">{errors.email.message}</small>}
        </div>
        <button type="submit" className="btn btn-custom">Enviar</button>
      </form>
      {message && <div className="custom-popup">{message}</div>}
    </div>
  );
};

export default ForgotPassword;