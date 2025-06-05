import React from 'react';

const FiltroTipos = ({ tipos, tipoSeleccionado, setTipoSeleccionado }) => {
  return (
    <div className="filtro-tipos">
      {tipos.map((tipo) => (
        <button
          key={tipo.id}
          className={`tipo-boton ${tipoSeleccionado === tipo.id ? 'activo' : ''}`}
          onClick={() => setTipoSeleccionado(tipoSeleccionado === tipo.id ? '' : tipo.id)}
        >
          {tipo.name}
        </button>
      ))}
    </div>
  );
};

export default FiltroTipos;