import './PuntosBurger.css';
import { Link } from 'react-router-dom';
import moneda from '../../assets/img/monedaRevoluxBurger.png';

const PuntosBurger = () => {
  return (
    <div className="puntos-section py-5">
      <h2 className="titulo mb-4">¡Acumula Puntos Disfrutando de la comida!</h2>
      <div className="container-fluid">
        <div className="row justify-content-center align-items-center">
          <div className="col-12 col-md-6 col-lg-4 text-center">
            <img src={moneda} alt="Moneda" className="moneda" />
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
  );
};

export default PuntosBurger;