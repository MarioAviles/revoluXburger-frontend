import React, { useEffect, useState } from 'react';
import './Cabecera.css';
import { Link } from 'react-router-dom';
import logoRevoluX from '../../assets/img/logoRevoluXAmarillo.png';
import CarritoIcono from '../CarritoIcono/CarritoIcono';

const Cabecera = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // Detecta si la pantalla es móvil o tablet
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Actualiza el estado al cambiar el tamaño de la pantalla
    };

    const handleScroll = () => {
      setScrolled(prev => {
        if (!prev && window.scrollY > 300) return true;
        if (prev && window.scrollY < 250) return false;
        return prev;
      });
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`cabecera container-fluid${!isMobile ? ' sticky-top' : ''}${scrolled ? ' cabecera-scrolled' : ''}`}>
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
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Cabecera;