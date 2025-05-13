// src/hooks/useUsers.js
import { useEffect, useState } from "react";
import { getAllUsers, updateUser, deleteUser } from "../servicios/userService";

export const useUsers = (token) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await getAllUsers(token);
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUser = async (id, updatedData) => {
    try {
      const updated = await updateUser(id, updatedData, token);
      setUsers((prev) =>
        prev.map((u) => (u.id === id ? { ...u, ...updated } : u))
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id, token);
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (token) fetchUsers();
  }, [token]);

  return {
    users,
    loading,
    error,
    updateUser: handleUpdateUser,
    deleteUser: handleDeleteUser,
    refetch: fetchUsers,
  };
};
