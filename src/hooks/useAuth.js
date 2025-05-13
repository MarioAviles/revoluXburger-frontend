import { useState } from "react";
import { login, register } from "../servicios/userService";

export const useAuth = () => {
  const [token, setToken] = useState(() => localStorage.getItem("token") || null);
  const [error, setError] = useState(null);

  const handleLogin = async (username, password) => {
    try {
      const res = await login(username, password);
      setToken(res.token);
      localStorage.setItem("token", res.token);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleRegister = async (userData) => {
    try {
      await register(userData);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  return {
    token,
    login: handleLogin,
    register: handleRegister,
    logout,
    error,
  };
};
