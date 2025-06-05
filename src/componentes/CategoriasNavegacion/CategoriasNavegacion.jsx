import React from 'react';
import { Link } from 'react-router-dom';

const CategoriasNavegacion = ({ categorias, categoriaSeleccionada }) => {
  return (
    <div className="categorias-navegacion mb-4">
      {categorias.map((categoria) => (
        <Link
          key={categoria.id}
          to={`/carta/${categoria.name.toLowerCase()}`}
          className={`categoria-link ${categoriaSeleccionada.id === categoria.id ? 'activo' : ''}`}
        >
          {categoria.name}
        </Link>
      ))}
    </div>
  );
};

export default CategoriasNavegacion;