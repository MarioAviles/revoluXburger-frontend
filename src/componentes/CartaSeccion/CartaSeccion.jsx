import './CartaSeccion.css';
import { Link } from 'react-router-dom';
import useCategorias from '../../hooks/useCategorias';

const CartaSeccion = () => {
  const { categorias, loading, error } = useCategorias();

  if (loading) return <div className="text-center py-5">Cargando categorías...</div>;
  if (error) return <div className="text-center py-5 text-danger">{error}</div>;

  return (
    <div className="menu-section py-5">
      <h2 className="titulo mb-4">Carta</h2>
      <div className="container">
        <div className="row">
          {categorias.map(cat => (
            <div key={cat.id} className="col-12 col-md-6 mb-4">
              <Link
                to={`/carta/${cat.name.toLowerCase()}`}
                className="menu-item"
                style={{
                  backgroundImage: `url(${cat.imageCat})`
                }}
              >
                <div className="menu-overlay"></div>
                <div className="menu-text">
                  <p className="m-0">{cat.name}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="text-center mt-4 subtitulo-carta p-3">
        <p>Haz clic en la sección que más te apetezca y explora nuestra carta.</p>
      </div>
    </div>
  );
};

export default CartaSeccion;