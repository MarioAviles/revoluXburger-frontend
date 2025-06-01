import { useState } from "react";
import { login, register, forgotPassword, resetPassword } from "../servicios/userService";

export const useAuth = () => {
  const [token, setToken] = useState(() => localStorage.getItem("token") || null);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const handleLogin = async (username, password) => {
    try {
      const res = await login(username, password);
      setToken(res.token);
      localStorage.setItem("token", res.token);
      setError(null);
      setMessage(null);
    } catch (err) {
      setError(err.message);
      setMessage(null);
    }
  };

  const handleRegister = async (userData) => {
    try {
      await register(userData);
      setError(null);
      setMessage(null);
    } catch (err) {
      setError(err.message);
      setMessage(null);
    }
  };

  const handleForgotPassword = async (email) => {
    try {
      await forgotPassword(email);
      setMessage("Correo de recuperación enviado. Revisa tu bandeja.");
      setError(null);
    } catch (err) {
      setError(err.message);
      setMessage(null);
    }
  };

  const handleResetPassword = async (token, newPassword) => {
    try {
      await resetPassword(token, newPassword);
      setMessage("Contraseña actualizada correctamente.");
      setError(null);
    } catch (err) {
      setError(err.message);
      setMessage(null);
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    setError(null);
    setMessage(null);
  };

  return {
    token,
    login: handleLogin,
    register: handleRegister,
    forgotPassword: handleForgotPassword,
    resetPassword: handleResetPassword,
    logout,
    error,
    message,
  };
};
