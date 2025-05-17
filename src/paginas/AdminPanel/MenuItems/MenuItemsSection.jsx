import './MenuItemsSection.css';
import { useNavigate } from 'react-router-dom';

const MenuItemsSection = () => {
  const navigate = useNavigate();
  return (
    <div className="admin-section text-center">
      <h4 className="mb-3 text-warning">Menú</h4>
      <button className="btn btn-warning w-100 mb-4" onClick={() => navigate('/admin/menu/add')}>Añadir producto</button>
      <button className="btn btn-secondary w-100 mb-4" onClick={() => navigate('/admin/menu/list')}>Ver productos</button>
      <button className="btn btn-info w-100 mb-4" onClick={() => navigate('/admin/menu/edit')}>Editar producto</button>
      <button className="btn btn-danger w-100" onClick={() => navigate('/admin/menu/delete')}>Eliminar producto</button>
    </div>
  );
};

export default MenuItemsSection;