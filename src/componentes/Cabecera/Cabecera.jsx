import './Cabecera.css';
import { Link } from 'react-router-dom';
import logoRevoluX from '../../assets/img/logoRevoluXAmarillo.png';

const Cabecera = () => {
  return (
    
    <header className="cabecera container-fluid text-center">
      <nav className="navbar navbar-expand-md navbar-dark">
        <div className="container-fluid d-flex flex-column align-items-center">
          
          {/* Logo centrado */}
          <Link to="/" className="d-block text-center my-2">
            <img src={logoRevoluX} alt="Logo RevoluX" className="logo" />
          </Link>

          {/* Menú */}
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
                <Link className="nav-link" to="/login">Xcoins</Link>
              </li>
            </ul>
          </div>

        </div>
      </nav>
    </header>
  );
};

export default Cabecera;
