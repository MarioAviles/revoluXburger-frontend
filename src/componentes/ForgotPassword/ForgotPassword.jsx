import React, { useState } from 'react';
import './ForgotPassword.css';
import { forgotPassword } from '../../servicios/userService';
import { useForm } from 'react-hook-form';

const ForgotPassword = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [message, setMessage] = useState(null);
  const [showReenvio, setShowReenvio] = useState(false); // Estado para controlar el botón de reenvío

  const onSubmit = async (data) => {
    try {
      const { email } = data;
      const response = await forgotPassword(email);
      setMessage("Se ha enviado un correo para restablecer tu contraseña.");
      setShowReenvio(false); // Ocultar el botón de reenvío inicialmente
      setTimeout(() => setShowReenvio(true), 30000); // Mostrar el botón después de 30 segundos
    } catch (error) {
      setMessage(error.message || "Error al enviar el correo de recuperación.");
    }
  };

  const handleReenvio = async () => {
    setMessage(null); // Limpiar el mensaje anterior
    setShowReenvio(false); // Ocultar el botón de reenvío
    setTimeout(() => setShowReenvio(true), 30000); // Reiniciar el temporizador
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
      {showReenvio && (
        <div className="reenvio-container">
          <p>¿No has recibido el correo?</p>
          <button onClick={handleReenvio} className="btn btn-custom">Volver a solicitar</button>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;