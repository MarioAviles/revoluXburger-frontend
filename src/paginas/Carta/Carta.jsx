import './Carta.css';
import { Link, useParams } from 'react-router-dom';
import useHamburguesas from '../../hooks/useHamburguesas';
import useEntrantes from '../../hooks/useEntrantes';
import useBebidas from '../../hooks/useBebidas';
import CartaSeccion from '../../componentes/CartaSeccion/CartaSeccion'; // Importa el componente de sección de carta

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
    return <CartaSeccion />; // Si no hay sección válida, muestra la sección de carta
  }


    {/* Antes de mostrar cada categoria, se pondra un ajax loader para saber que se estan cargando los datos */}
    return (
      <div className="carta container py-5">
        <h1 className="titulo-carta mb-4">{seccion.charAt(0).toUpperCase() + seccion.slice(1)}</h1>
        <div className="row">
          {productos.map((producto, index) => (
            <div key={index} className="col-12 col-md-6 col-lg-4 mb-4">
              <Link
                to={`/carta/${seccion}/${producto.nombre.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-decoration-none"
              >
                <div className="producto-item">
                  <img src={producto.imagen} alt={producto.nombre} className="img-fluid producto-img" />
                  <div className="producto-overlay">
                    <h2 className="producto-nombre">{producto.nombre}</h2>
                    <p className="producto-precio">{producto.precio.toFixed(2)} €</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
};

export default Carta;