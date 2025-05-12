import './Carta.css';
import { useParams } from 'react-router-dom';
import useHamburguesas from '../../hooks/useHamburguesas';
import useEntrantes from '../../hooks/useEntrantes';
import useBebidas from '../../hooks/useBebidas';

const Carta = () => {
  const { seccion } = useParams(); // Captura el parámetro :seccion
  let productos = [];

  // Cargar los datos según la sección
  if (seccion === 'hamburguesas') {
    productos = useHamburguesas();
  } else if (seccion === 'entrantes') {
    productos = useEntrantes();
  } else if (seccion === 'bebidas') {
    productos = useBebidas();
  } else {
    return <h1 className="text-center mt-5">Sección no encontrada</h1>;
  }

  return (
    <div className="carta container py-5">
      <h1 className="titulo-carta mb-4">{seccion.charAt(0).toUpperCase() + seccion.slice(1)}</h1>
      <div className="row">
        {productos.map((producto, index) => (
          <div key={index} className="col-12 col-md-6 col-lg-4 mb-4">
            <div className="producto-item">
              <img src={producto.imagen} alt={producto.nombre} className="img-fluid producto-img" />
              <div className="producto-overlay">
                <h2 className="producto-nombre">{producto.nombre}</h2>
                <p className="producto-precio">{producto.precio} €</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carta;