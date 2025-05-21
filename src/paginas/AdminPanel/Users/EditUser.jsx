import { useState, useEffect } from "react";
import { useUsers } from "../../../hooks/useUsers";
import { useParams, useNavigate } from "react-router-dom";

const EditUser = () => {
  const navigate = useNavigate(); 
  const { userId } = useParams();
  const token = localStorage.getItem("token");
  const { users, updateUser, loading, refetch } = useUsers(token);
  const [selectedId, setSelectedId] = useState("");
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [rol, setRol] = useState(""); 
  const [popup, setPopup] = useState(null);

  const handleSelect = (e) => {
    const id = e.target.value;
    setSelectedId(id);
    const user = users.find(u => String(u.id) === String(id));
    setNombre(user?.username || "");
    setEmail(user?.email || "");
    setRol(user?.role || "USER");
    setPopup(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPopup(null);
    try {
      await updateUser(selectedId, { username: nombre, email, role: rol });
      setPopup("Usuario actualizado correctamente");
      refetch();
      setTimeout(() => setPopup(null), 3000);
      navigate(`/admin-panel`);
    } catch (err) {
      setPopup("Error al actualizar usuario");
      setTimeout(() => setPopup(null), 3000);
    }
  };

  useEffect(() => {
    if (userId && users.length > 0) {
      setSelectedId(userId);
      const user = users.find(u => String(u.id) === String(userId));
      setNombre(user?.username || "");
      setEmail(user?.email || "");
      setRol(user?.role || "USER");
      setPopup(null);
    }
  }, [userId, users]);

  return (
    <div className="admin-crud-page">
      <h3>Editar usuario</h3>
      {loading ? <div>Cargando usuarios...</div> : (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Selecciona usuario</label>
            <select className="form-control" value={selectedId} onChange={handleSelect} required>
              <option value="">-- Selecciona --</option>
              {users.map(u => (
                <option key={u.id} value={u.id}>
                  {u.username} ({u.email})
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label>Nuevo nombre</label>
            <input type="text" className="form-control" value={nombre} onChange={e => setNombre(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label>Nuevo email</label>
            <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label>Rol</label>
            <select className="form-control" value={rol} onChange={e => setRol(e.target.value)}>
              <option value="USER">Usuario</option>
              <option value="ADMIN">Administrador</option>
            </select>
          </div>
          <button className="btn btn-primary w-100" type="submit" disabled={!selectedId}>Editar</button>
        </form>
      )}
      {popup && <div className="custom-popup">{popup}</div>}
    </div>
  );
};

export default EditUser;