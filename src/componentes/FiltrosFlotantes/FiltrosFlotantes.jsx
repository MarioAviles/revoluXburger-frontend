import React from 'react';

const FiltrosFlotantes = ({ busqueda, setBusqueda, ordenPrecio, setOrdenPrecio }) => {
  return (
    <div className="filtros-flotantes">
      <input
        type="text"
        className="buscador"
        placeholder="Buscar productos..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />
      <div className="filtro-precio">
        <button
          className={`btn-precio ${ordenPrecio === 'mayor-menor' ? 'activo' : ''}`}
          onClick={() => setOrdenPrecio('mayor-menor')}
        >
          Mayor a menor
        </button>
        <button
          className={`btn-precio ${ordenPrecio === 'menor-mayor' ? 'activo' : ''}`}
          onClick={() => setOrdenPrecio('menor-mayor')}
        >
          Menor a mayor
        </button>
      </div>
    </div>
  );
};

export default FiltrosFlotantes;