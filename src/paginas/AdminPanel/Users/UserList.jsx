import { useUsers } from "../../../hooks/useUsers";

const UserList = () => {
  const token = localStorage.getItem("token");
  const { users, loading, error } = useUsers(token);

  return (
    <div className="admin-crud-page">
      <h3>Lista de usuarios</h3>
      {loading ? <div>Cargando...</div> : (
        <ul className="list-group">
          {users.map(u => (
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