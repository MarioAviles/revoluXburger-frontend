import './ReservationsSection.css';
import { useNavigate } from 'react-router-dom';

const ReservationsSection = () => {
  const navigate = useNavigate();
  return (
    <div className="admin-section text-center">
      <h4 className="mb-3 text-warning">Reservas</h4>
      <button className="btn btn-warning w-100 mb-4" onClick={() => navigate('/admin/reservations/add')}>Añadir reserva</button>
      <button className="btn btn-secondary w-100 mb-4" onClick={() => navigate('/admin/reservations/list')}>Ver reservas</button>
    </div>
  );
};

export default ReservationsSection;