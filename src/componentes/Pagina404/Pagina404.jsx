import React from 'react';
import { Link } from 'react-router-dom';
import './Pagina404.css';

const Pagina404 = () => {
  return (
    <div className="pagina404-container text-center">
      <h1 className="pagina404-title">404</h1>
      <p className="pagina404-message">Lo sentimos, la página que buscas no existe.</p>
      <Link to="/" className="pagina404-link">Volver al inicio</Link>
    </div>
  );
};

export default Pagina404;