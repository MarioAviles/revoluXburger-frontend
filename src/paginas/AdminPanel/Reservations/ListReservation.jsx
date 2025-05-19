import { useEffect, useState } from "react";
import { getAllReservations } from "../../../servicios/reservasService";

const ListReservation = () => {
  const [reservas, setReservas] = useState([]);
  const [search, setSearch] = useState(""); // Estado para el buscador
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllReservations(token);
        setReservas(data);
      } catch {
        setError("Error al cargar reservas");
      }
    };
    fetchData();
  }, [token]);

  // Filtrar reservas según el texto del buscador
  const filteredReservas = reservas.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="admin-crud-page">
      <h3 className="mb-4">Lista de reservas</h3>
        <p className="mb-4">Puedes buscar reservas por nombre.</p>
        <input
          type="text"
          className="form-control"
          placeholder="Buscar por nombre..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      <ul className="list-group">
        {filteredReservas.map(r => (
          <li key={r._id} className="list-group-item">
            {r.name} - {r.phone} - {r.description} - {new Date(r.date).toLocaleString()}
          </li>
        ))}
      </ul>
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </div>
  );
};

export default ListReservation;