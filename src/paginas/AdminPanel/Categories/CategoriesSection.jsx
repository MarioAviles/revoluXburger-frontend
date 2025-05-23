import './CategoriesSection.css';
import { useNavigate } from 'react-router-dom';

const CategoriesSection = () => {
  const navigate = useNavigate();
  return (
    <div className="admin-section text-center">
      <h4 className="mb-3 text-warning">Categorías</h4>
      <button
        className="btn btn-warning w-100 mb-4"
        onClick={() => navigate('/admin/categories/add')}
      >
        Añadir categoría
      </button>
      <button
        className="btn btn-secondary w-100 mb-4"
        onClick={() => navigate('/admin/categories/list')}
      >
        Ver categorías
      </button>
    </div>
  );
};

export default CategoriesSection;