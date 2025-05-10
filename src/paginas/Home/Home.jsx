import './Home.css';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container-fluid w-100 m-0 p-0 text-center">
      <div className="hero-section">
        <div className="overlay">
          <h1 className="hero-title">RevoluXBurger</h1>
          <p className="hero-subtitle">"Más que burger... ¡es Revolux!"</p>
        </div>
      </div>
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
            <div className="col-12 col-md-6 col-lg-4 mb-4">
              <Link to="/carta/bebidas" className="menu-item menu-item-3">
                <div className="menu-overlay"></div>
                <div className="menu-text">
                  <p className="m-0">Bebidas</p>
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
        <div className="text-center mt-4 subtitulo-carta">
          <p>Haz clic en la sección que más te apetezca y explora nuestra carta.</p>
        </div>
      </div>
      <div className="puntos-section py-5">
        <h2 className="titulo mb-4">¡Acumula Puntos Disfrutando de la comida!</h2>
        <div className="container">
          <div className="row justify-content-center align-items-center">
            <div className="col-12 col-md-6 col-lg-4 text-center">
              <img
                src="src\assets\monedaReboluxBurger.png"
                alt="Moneda"
                className="moneda"
              />
            </div>
            <div className="col-12 col-md-6 col-lg-6 text-center">
              <p className="texto-puntos mt-4">
                ¡Regístrate ahora y empieza a acumular XCoin con cada compra!
                Canjea tus XCoins por descuentos exclusivos y disfruta de
                nuestras deliciosas hamburguesas.
              </p>
              <Link to="/login" className="btn btn-registrarse">
                Regístrate Ahora
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;