import './TiposSection.css';
import { useNavigate } from 'react-router-dom';

const TiposSection = () => {
  const navigate = useNavigate();

  return (
    <div className="admin-section text-center">
      <h4 className="mb-3 text-warning">Tipos</h4>
      <button
        className="btn btn-warning w-100 mb-4"
        onClick={() => navigate('/admin/tipos/add')}
      >
        Añadir tipo
      </button>
      <button
        className="btn btn-secondary w-100 mb-4"
        onClick={() => navigate('/admin/tipos/list')}
      >
        Ver tipos
      </button>
    </div>
  );
};

export default TiposSection;