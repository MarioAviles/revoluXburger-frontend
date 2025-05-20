import './Carta.css';
import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import useHamburguesas from '../../hooks/useHamburguesas';
import useEntrantes from '../../hooks/useEntrantes';
import useBebidas from '../../hooks/useBebidas';
import usePostres from '../../hooks/usePostres';
import CartaSeccion from '../../componentes/CartaSeccion/CartaSeccion';

const Carta = () => {
  const { seccion } = useParams(); // Captura el parámetro :seccion
  const [busqueda, setBusqueda] = useState(''); // Estado para el buscador
  const [ordenPrecio, setOrdenPrecio] = useState(''); // Estado para el filtro de precios

  // Llama a todos los hooks de manera incondicional y luego se usa el que corresponde
  // Esto es para evitar que se llamen los hooks condicionalmente
  const hamburguesas = useHamburguesas();
  const entrantes = useEntrantes();
  const bebidas = useBebidas();
  const postres = usePostres();

  // Selecciona los productos según la sección
  let productos = [];
  if (seccion === 'hamburguesas') {
    productos = hamburguesas;
  } else if (seccion === 'entrantes') {
    productos = entrantes;
  } else if (seccion === 'bebidas') {
    productos = bebidas;
  } else if (seccion === 'postres') {
    productos = postres;
  } else {
    return <CartaSeccion />; // Si no hay sección válida, muestra la sección de carta
  }

  // Filtrar productos por búsqueda
  const productosFiltradosPorBusqueda = busqueda
    ? productos.filter((producto) =>
        producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
      )
    : productos;

  // Ordenar productos por precio
  const productosOrdenadosPorPrecio = ordenPrecio
    ? [...productosFiltradosPorBusqueda].sort((a, b) => {
        if (ordenPrecio === 'mayor-menor') return b.precio - a.precio; // Mayor a menor
        if (ordenPrecio === 'menor-mayor') return a.precio - b.precio; // Menor a mayor
        return 0;
      })
    : productosFiltradosPorBusqueda;

  return (
    <div className="carta container py-5">
      <h1 className="titulo-carta mb-4">{seccion.charAt(0).toUpperCase() + seccion.slice(1)}</h1>

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

      {/* Productos */}
      <div className="row mt-5">
        <h2 className='texto-informacion'>¡ Haz click en el producto que te guste para ver su información !</h2>

        {productosOrdenadosPorPrecio.map((producto, index) => (
          <div key={index} className="col-12 col-md-6 col-lg-4 mb-4">
            <Link
              to={`/carta/${seccion}/${producto.nombre.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-decoration-none"
            >
              <div className="producto-item">
                <img src={producto.imagen} alt={producto.nombre} className="w-100" />
                <div className="producto-overlay">
                  <span className="producto-nombre">{producto.nombre}</span>
                  <span className="producto-precio">{producto.precio.toFixed(2)} €</span>
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