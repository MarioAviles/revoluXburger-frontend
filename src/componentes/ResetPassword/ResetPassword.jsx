import React, { useState } from 'react';
import './ResetPassword.css';
import { useForm } from 'react-hook-form';
import { resetPassword } from '../../servicios/userService';
import { useLocation } from 'react-router-dom';

const ResetPassword = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token'); // Obtener el token de los parámetros de consulta
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [message, setMessage] = useState(null);

    const onSubmit = async (data) => {
        try {
            const { newPassword } = data;
            const response = await resetPassword(token, newPassword);
            setMessage("Tu contraseña ha sido restablecida exitosamente.");
        } catch (error) {
            setMessage(error.message || "Error al restablecer la contraseña.");
        }
    };

    return (
        <div className="reset-password-container text-center">
            <h1>Restablecer Contraseña</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="reset-password-form">
                <div className="mb-3">
                    <label htmlFor="newPassword">Nueva Contraseña</label>
                    <input
                        type="password"
                        id="newPassword"
                        className="form-control"
                        {...register("newPassword", { required: "La nueva contraseña es obligatoria" })}
                    />
                    {errors.newPassword && <small className="text-danger">{errors.newPassword.message}</small>}
                </div>
                <button type="submit" className="btn btn-custom">Restablecer</button>
            </form>
            {message && <div className="custom-popup">{message}</div>}
        </div>
    );
};

export default ResetPassword;