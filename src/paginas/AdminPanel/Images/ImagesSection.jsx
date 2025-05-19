import { useNavigate } from "react-router-dom";
const ImagesSection = () => {
  const navigate = useNavigate();
  return (
    <div className="admin-section text-center">
      <h4 className="mb-3 text-warning">Imagenes</h4>
      <button className="btn btn-warning w-100 mb-4" onClick={() => navigate('/admin/images/add')}>Añadir imagen</button>
      <button className="btn btn-secondary w-100 mb-4" onClick={() => navigate('/admin/images/list')}>Ver imagenes</button>
      <button className="btn btn-info w-100 mb-4" onClick={() => navigate('/admin/images/edit')}>Editar imagen</button>
      <button className="btn btn-danger w-100" onClick={() => navigate('/admin/images/delete')}>Eliminar imagen</button>
    </div>
  );
};

export default ImagesSection;