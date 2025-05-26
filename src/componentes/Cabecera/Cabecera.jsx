import './Cabecera.css';
import { Link } from 'react-router-dom';
import logoRevoluX from '../../assets/img/logoRevoluXAmarillo.png';
import CarritoIcono from '../CarritoIcono/CarritoIcono';

const Cabecera = () => {
  return (
    
    <header className="cabecera sticky-top container-fluid text-center align-items-center justify-content-center">
      <nav className="navbar navbar-expand-md navbar-dark align-items-center justify-content-center text-center">
        <div className="container-fluid d-flex flex-column align-items-center">
          
          <Link to="/" className="d-block text-center mb-2">
            <img src={logoRevoluX} alt="Logo RevoluX" className="logo" />
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
            <ul className="navbar-nav text-center">
              <li className="nav-item">
                <Link className="nav-link" to="/">Inicio</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/carta">Carta</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/reservas">Reservas</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/panel">Cuenta</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/carrito"><CarritoIcono /></Link>
                
              </li>
            </ul>
          </div>

        </div>
      </nav>
    </header>
  );
};

export default Cabecera;
