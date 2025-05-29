import React, { useEffect, useState } from 'react';
import './Cabecera.css';
import { Link } from 'react-router-dom';
import logoRevoluX from '../../assets/img/logoRevoluXAmarillo.png';
import CarritoIcono from '../CarritoIcono/CarritoIcono';

const Cabecera = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(prev => {
        if (!prev && window.scrollY > 300) return true;
        if (prev && window.scrollY < 250) return false;
        return prev;
      });
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`cabecera sticky-top container-fluid${scrolled ? ' cabecera-scrolled' : ''}`}>
      <nav className="navbar navbar-expand-md navbar-dark">
        <div className={`container-fluid d-flex ${scrolled ? 'flex-row justify-content-center align-items-center' : 'flex-column align-items-center'}`}>
          {scrolled ? (
            <>
              <Link to="/" className="logo-link ocultar me-3 mb-0">
                <img src={logoRevoluX} alt="Logo RevoluX" className="logo" />
              </Link>
              <div className="collapse navbar-collapse show justify-content-center" id="navbarNav">
                <ul className="navbar-nav flex-row align-items-center gap-2">
                  <li className="nav-item">
                    <Link className="nav-link" to="/">Inicio</Link>
                  </li>
                  <li
                    className="nav-item dropdown"
                    onMouseEnter={() => setShowDropdown(true)}
                    onMouseLeave={() => setShowDropdown(false)}
                  >
                    <Link className="nav-link" to="/carta">Carta</Link>
                    {showDropdown && (
                      <ul className="dropdown-menu">
                        <li><Link className="dropdown-item" to="/carta/burger">Hamburguesas</Link></li>
                        <li><Link className="dropdown-item" to="/carta/entrante">Entrantes</Link></li>
                        <li><Link className="dropdown-item" to="/carta/postre">Postres</Link></li>
                        <li><Link className="dropdown-item" to="/carta/bebida">Bebidas</Link></li>
                      </ul>
                    )}
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
            </>
          ) : (
            <>
              <Link to="/" className="logo-link mb-2">
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
                  <li
                    className="nav-item dropdown"
                    onMouseEnter={() => setShowDropdown(true)}
                    onMouseLeave={() => setShowDropdown(false)}
                  >
                    <Link className="nav-link" to="/carta">Carta</Link>
                    {showDropdown && (
                      <ul className="dropdown-menu">
                        <li><Link className="dropdown-item" to="/carta/burger">Hamburguesas</Link></li>
                        <li><Link className="dropdown-item" to="/carta/entrante">Entrantes</Link></li>
                        <li><Link className="dropdown-item" to="/carta/postre">Postres</Link></li>
                        <li><Link className="dropdown-item" to="/carta/bebida">Bebidas</Link></li>
                      </ul>
                    )}
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
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Cabecera;