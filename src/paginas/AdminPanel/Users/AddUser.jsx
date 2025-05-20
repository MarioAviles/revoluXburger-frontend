import { useState } from "react";
import { register } from "../../../servicios/userService";

const AddUser = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState("USER");
  const [popup, setPopup] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPopup(null);
    try {
      await register({ username: nombre, password, email, role: rol });
      setPopup("Usuario añadido correctamente");
      setNombre("");
      setEmail("");
      setPassword("");
      setRol("USER");
      setTimeout(() => setPopup(null), 3000);
    } catch (err) {
      setPopup("Error al añadir usuario");
      setTimeout(() => setPopup(null), 3000);
    }
  };

  return (
    <div className="admin-crud-page">
      <h3>Añadir usuario</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Nombre</label>
          <input type="text" className="form-control" value={nombre} onChange={e => setNombre(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Contraseña</label>
          <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Rol</label>
          <select className="form-control" value={rol} onChange={e => setRol(e.target.value)}>
            <option value="USER">Usuario</option>
            <option value="ADMIN">Administrador</option>
          </select>
        </div>
        <button className="btn btn-success w-100" type="submit">Añadir</button>
      </form>
      {popup && <div className="custom-popup">{popup}</div>}
    </div>
  );
};

export default AddUser;