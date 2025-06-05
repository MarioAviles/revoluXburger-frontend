import React, { useState, useEffect } from 'react';
import './ForgotPassword.css';
import { forgotPassword } from '../../servicios/userService';
import { useForm } from 'react-hook-form';

const ForgotPassword = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [message, setMessage] = useState(null);
  const [showReenvio, setShowReenvio] = useState(false); // Estado para controlar el botón de reenvío
  const [timer, setTimer] = useState(0); // Estado para el temporizador

  const onSubmit = async (data) => {
    try {
      const { email } = data;
      const response = await forgotPassword(email);
      setMessage("Se ha enviado un correo para restablecer tu contraseña.");
      setShowReenvio(false); // Ocultar el botón de reenvío inicialmente
      setTimer(30); // Iniciar el temporizador de 30 segundos
    } catch (error) {
      setMessage(error.message || "Error al enviar el correo de recuperación.");
    }
  };

  const handleReenvio = async () => {
    setMessage(null); // Limpiar el mensaje anterior
    setShowReenvio(false); // Ocultar el botón de reenvío
    setTimer(30); // Reiniciar el temporizador
  };

  // Reducir el temporizador cada segundo
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(interval); // Limpiar el intervalo al desmontar
    } else {
      setShowReenvio(true); // Mostrar el botón de reenvío cuando el temporizador llegue a 0
    }
  }, [timer]);

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
        {timer === 0 && (
          <button type="submit" className="btn btn-custom">Enviar</button>
        )}
      </form>
      {message && <div className="custom-popup">{message}</div>}
      {timer > 0 && (
        <div className="temporizador-container">
          <p>No has recibido el correo?  <br />Espera {timer} segundos antes de volver a enviar.</p>
        </div>
      )}
  
    </div>
  );
};

export default ForgotPassword;