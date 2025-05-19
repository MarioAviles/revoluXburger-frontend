import { useState } from "react";
import { useUsers } from "../../../hooks/useUsers";
import AjaxLoader from "../../../componentes/AjaxLoader/AjaxLoader";
const UserList = () => {
  const token = localStorage.getItem("token");
  const { users, loading, error } = useUsers(token);
  const [search, setSearch] = useState("");

  const filteredUsers = users.filter(u =>
    u.username.toLowerCase().includes(search.toLowerCase())
  );

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
        <li key={u.id} className="list-group-item">
          {u.username} - {u.email} - {u.role}
        </li>
      ))}
    </ul>
  )}
  {error && <div className="alert alert-danger mt-3">{error}</div>}
</div>
  );
};

export default UserList;