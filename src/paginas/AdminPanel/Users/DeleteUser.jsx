import { useState } from "react";
import { useUsers } from "../../../hooks/useUsers";

const DeleteUser = () => {
  const token = localStorage.getItem("token");
  const { users, deleteUser, loading, refetch } = useUsers(token);
  const [selectedId, setSelectedId] = useState("");
  const [popup, setPopup] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPopup(null);
    try {
      await deleteUser(selectedId);
      setPopup("Usuario eliminado correctamente");
      setSelectedId("");
      refetch();
      setTimeout(() => setPopup(null), 3000);
    } catch (err) {
      setPopup("Error al eliminar usuario");
      setTimeout(() => setPopup(null), 3000);
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
      {popup && <div className="custom-popup">{popup}</div>}
    </div>
  );
};

export default DeleteUser;