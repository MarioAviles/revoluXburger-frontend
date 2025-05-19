import { useState } from "react";
import { useUsers } from "../../../hooks/useUsers";

const DeleteUser = () => {
  const token = localStorage.getItem("token");
  const { users, deleteUser, loading, error, refetch } = useUsers(token);
  const [selectedId, setSelectedId] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");
    try {
      await deleteUser(selectedId);
      setMensaje("Usuario eliminado correctamente");
      setSelectedId("");
      refetch();
    } catch (err) {
      setMensaje("Error al eliminar usuario");
    }
  };

  return (
    <div className="admin-crud-page">
      <h3>Eliminar usuario</h3>
      {loading ? <div>Cargando usuarios...</div> : (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Selecciona usuario</label>
            <select className="form-control" value={selectedId} onChange={e => setSelectedId(e.target.value)} required>
              <option value="">-- Selecciona --</option>
              {users.map(u => (
                <option key={u.id} value={u.id}>{u.username} ({u.email})</option>
              ))}
            </select>
          </div>
          <button className="btn btn-danger w-100" type="submit" disabled={!selectedId}>Eliminar</button>
        </form>
      )}
      {mensaje && <div className="alert alert-info mt-3">{mensaje}</div>}
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </div>
  );
};

export default DeleteUser;