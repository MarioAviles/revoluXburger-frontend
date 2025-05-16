import { useEffect, useState } from "react";
import { getAllReservations } from "../../../servicios/reservasService";

const ListReservation = () => {
  const [reservas, setReservas] = useState([]);
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

  return (
    <div className="admin-crud-page">
      <h3>Lista de reservas</h3>
      <ul className="list-group">
        {reservas.map(r => (
          <li key={r._id} className="list-group-item">
            {r.name} - {r.phone} - {r.description} - {r.date}
          </li>
        ))}
      </ul>
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </div>
  );
};

export default ListReservation;