import React from 'react';
import { Link } from 'react-router-dom';

const ListaProductos = ({ productos, seccion }) => {
  return (
    <div className="row mt-5">
      <h2 className='texto-informacion'>¡ Haz click en el producto que te guste para ver su información !</h2>
      {productos.map((producto) => (
        <div key={producto.id} className="col-12 col-md-6 col-lg-4 mb-4">
          <Link
            to={`/carta/${seccion}/${producto.name.toLowerCase().replace(/\s+/g, '-')}`}
            className="text-decoration-none"
          >
            <div className="producto-item" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              <img src={producto.imageUrl} alt={producto.name} className="w-100" />
              <div className="producto-overlay">
                <span className="producto-nombre">{producto.name}</span>
                <span className="producto-precio">{producto.price.toFixed(2)} €</span>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ListaProductos;