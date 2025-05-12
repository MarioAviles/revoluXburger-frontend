import './CartaSeccion.css';
import { Link } from 'react-router-dom';

const CartaSeccion = () => {
  return (
    <div className="menu-section py-5">
      <h2 className="titulo mb-4">Carta</h2>
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-6 col-lg-4 mb-4">
            <Link to="/carta/hamburguesas" className="menu-item menu-item-1">
              <div className="menu-overlay"></div>
              <div className="menu-text">
                <p className="m-0">Hamburguesas</p>
              </div>
            </Link>
          </div>
          <div className="col-12 col-md-6 col-lg-4 mb-4">
            <Link to="/carta/entrantes" className="menu-item menu-item-2">
              <div className="menu-overlay"></div>
              <div className="menu-text">
                <p className="m-0">Entrantes</p>
              </div>
            </Link>
          </div>
          <div className="col-12 col-md-6 col-lg-4 mb-4">
            <Link to="/carta/bebidas" className="menu-item menu-item-3">
              <div className="menu-overlay"></div>
              <div className="menu-text">
                <p className="m-0">Bebidas</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="text-center mt-4 subtitulo-carta p-3">
        <p>Haz clic en la sección que más te apetezca y explora nuestra carta.</p>
      </div>
    </div>
  );
};

export default CartaSeccion;