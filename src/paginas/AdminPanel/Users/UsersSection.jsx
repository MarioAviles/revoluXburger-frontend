import './UsersSection.css';
import { useNavigate } from 'react-router-dom';

const UsersSection = () => {
  const navigate = useNavigate();
  return (
    <div className="admin-section text-center">
      <h4 className="mb-3 text-warning">Usuarios</h4>
      <button className="btn btn-warning w-100 mb-4" onClick={() => navigate('/admin/users/add')}>Añadir usuario</button>
      <button className="btn btn-secondary w-100 mb-4" onClick={() => navigate('/admin/users/list')}>Ver usuarios</button>
    
    </div>
  );
};

export default UsersSection;