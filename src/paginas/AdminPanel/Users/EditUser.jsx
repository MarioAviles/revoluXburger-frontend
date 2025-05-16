import  { useState } from "react";
import { useUsers } from "../../../hooks/useUsers";

const EditUser = () => {
  const token = localStorage.getItem("token");
  const { users, updateUser, loading, error, refetch } = useUsers(token);
  const [selectedId, setSelectedId] = useState("");
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [rol, setRol] = useState(""); // Añadido para el rol
  const [mensaje, setMensaje] = useState("");

  const handleSelect = (e) => {
    const id = e.target.value;
    setSelectedId(id);
    const user = users.find(u => String(u.id) === String(id) || String(u._id) === String(id));
    setNombre(user?.username || "");
    setEmail(user?.email || "");
    setRol(user?.role || "USER"); // Carga el rol actual o USER por defecto
    setMensaje("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");
    try {
      await updateUser(selectedId, { username: nombre, email, role: rol }); // Envía el rol
      setMensaje("Usuario actualizado correctamente");
      refetch();
    } catch (err) {
      setMensaje("Error al actualizar usuario");
    }
  };

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
                <option key={u.id || u._id} value={u.id || u._id}>
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
          <button className="btn btn-primary" type="submit" disabled={!selectedId}>Editar</button>
        </form>
      )}
      {mensaje && <div className={`alert ${mensaje.includes("correctamente") ? "alert-info" : "alert-danger"} mt-3`}>{mensaje}</div>}
    </div>
  );
};

export default EditUser;