import './Carta.css';
import useCategorias from '../../hooks/useCategorias';

const Carta = () => {
  const categorias = useCategorias(); // Hook para obtener las categorías

  return (
    <div className="carta container py-5">
      <h1 className="titulo-carta mb-4">Nuestra Carta</h1>
      <div className="row">
        {categorias.map((categoria, index) => (
          <div key={index} className="col-12 col-md-6 col-lg-4 mb-4">
            <div className="categoria-item">
              <img src={categoria.imagen} alt={categoria.nombre} className="img-fluid categoria-img" />
              <div className="categoria-overlay">
                <h2 className="categoria-nombre">{categoria.nombre}</h2>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carta;