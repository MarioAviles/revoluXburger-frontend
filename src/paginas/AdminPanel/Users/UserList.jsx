import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUsers } from "../../../hooks/useUsers";
import AjaxLoader from "../../../componentes/AjaxLoader/AjaxLoader";
import PopupConfirmacion from "../../../componentes/PopUpConfirmacion/PopUpConfirmacion";

const UserList = () => {

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { users, deleteUser, loading, error, refetch } = useUsers(token);
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const [confirmId, setConfirmId] = useState(null);
  const [usersVisibles, setUserVisibles] = useState(10); // Número de usuarios visibles

 function filtrarUsuarios(users, search) {
  return users.filter(u =>
    u.username.toLowerCase().includes(search.toLowerCase())
  );
}

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

  const filteredUsers = filtrarUsuarios(users, search)

  // Solo muestra los primeros "usersVisibles" usuarios
  const usersMostrar = filteredUsers.slice(0, usersVisibles);


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
        <>
          <ul className="list-group">
            {usersMostrar.map(u => (
              <li key={u.id} className="list-group-item d-flex flex-column justify-content-between align-items-center gap-3 p-3">
                <span>
                  {u.username} - {u.email} - {u.role}
                </span>
                <div className="d-flex justify-content-center gap-4">
                  <button
                    className="btn btn-info btn-sm me-2"
                    onClick={() => navigate(`/admin/users/edit/${u.id}`)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => setConfirmId(u.id)}
                    disabled={deletingId === (u.id)}
                  >
                    {deletingId === (u.id) ? "Eliminando..." : "Eliminar"}
                  </button>
                </div>
              </li>
            ))}
          </ul>
          {/* Botón "Cargar más" */}
          {usersVisibles < filteredUsers.length && (
            <div className="text-center mt-3">
              <button
                className="btn btn-warning"
                onClick={() => setUserVisibles(usersVisibles + 10)}
              >
                Cargar más
              </button>
            </div>
          )}
        </>
      )}

      {/* Popup de confirmación */}
      {confirmId && (
  <PopupConfirmacion
    mensaje="¿Seguro que quieres eliminar este usuario?"
    onCancel={() => setConfirmId(null)}
    onConfirm={() => handleDelete(confirmId)}
  />
)}
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </div>
  );
};

export default UserList;