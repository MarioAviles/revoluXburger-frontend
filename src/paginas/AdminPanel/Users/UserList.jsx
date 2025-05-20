import { useState } from "react";
import { useUsers } from "../../../hooks/useUsers";
import AjaxLoader from "../../../componentes/AjaxLoader/AjaxLoader";

const UserList = () => {
  const token = localStorage.getItem("token");
  const { users, deleteUser, loading, error, refetch } = useUsers(token);
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const [confirmId, setConfirmId] = useState(null); // Nuevo estado para el popup

  const filteredUsers = users.filter(u =>
    u.username.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      await deleteUser(id);
      refetch();
    } catch {
      alert("Error al eliminar usuario");
    } finally {
      setDeletingId(null);
      setConfirmId(null);
    }
  };

  return (
    <div className="admin-crud-page">
      <h3 className="mb-4">Lista de usuarios</h3>
      <p className="mb-4">Puedes buscar usuarios por nombre.</p>
      <input
        type="text"
        className="form-control"
        placeholder="Buscar por nombre..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      {loading ? (
        <div> <AjaxLoader /></div>
      ) : (
        <ul className="list-group">
          {filteredUsers.map(u => (
            <li key={u.id || u._id} className="list-group-item d-flex justify-content-between align-items-center">
              <span>
                {u.username} - {u.email} - {u.role}
              </span>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => setConfirmId(u.id || u._id)}
                disabled={deletingId === (u.id || u._id)}
              >
                {deletingId === (u.id || u._id) ? "Eliminando..." : "Eliminar"}
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Popup de confirmación */}
      
      {confirmId && (
        <div className="popup-eliminar-overlay">
          <div className="popup-eliminar">
            <p>¿Seguro que quieres eliminar este usuario?</p>
            <div className="d-flex justify-content-center gap-2">
              <button className="btn btn-secondary" onClick={() => setConfirmId(null)}>Cancelar</button>
              <button className="btn btn-danger" onClick={() => handleDelete(confirmId)}>Eliminar</button>
            </div>
          </div>
        </div>
      )}
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </div>
  );
};

export default UserList;