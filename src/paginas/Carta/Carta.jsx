import './Carta.css';
import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import useCategorias from '../../hooks/useCategorias';
import useMenuItems from '../../hooks/useMenuItems';
import useTipos from '../../hooks/useTipos';
import CartaSeccion from '../../componentes/CartaSeccion/CartaSeccion';
import AjaxLoader from '../../componentes/AjaxLoader/AjaxLoader';

const Carta = () => {
  const { seccion } = useParams();
  const [busqueda, setBusqueda] = useState('');
  const [ordenPrecio, setOrdenPrecio] = useState('');
  const [tipoSeleccionado, setTipoSeleccionado] = useState(''); // Nuevo estado para el tipo seleccionado
  const { categorias, loading: loadingCategorias, error: errorCategorias } = useCategorias();
  const { menuItems, loading: loadingMenu, error: errorMenu } = useMenuItems();
  const { tipos, loading: loadingTipos, error: errorTipos } = useTipos();

  if (loadingCategorias || loadingMenu || loadingTipos) return (
    <div className="text-center py-5">
      <AjaxLoader />
      <div className="mt-3">Cargando...</div>
    </div>
  );
  if (errorCategorias || errorMenu || errorTipos) return <div className="text-center py-5 text-danger">{errorCategorias || errorMenu || errorTipos}</div>;

  // Buscar la categoría seleccionada por nombre (de la URL)
  const categoriaSeleccionada = categorias.find(
    cat => cat.name.toLowerCase() === seccion?.toLowerCase()
  );

  if (!categoriaSeleccionada) {
    return <CartaSeccion />;
  }

  // Filtrar productos por categoryId
  let productos = menuItems.filter(
    producto => producto.categoryId === categoriaSeleccionada.id
  );

  // Si la categoría es "Burger", filtrar también por tipo seleccionado
  if (categoriaSeleccionada.name.toLowerCase() === 'burger' && tipoSeleccionado) {
    productos = productos.filter(producto => producto.typeId === tipoSeleccionado);
  }

  // Filtrar productos por búsqueda
  const productosFiltradosPorBusqueda = busqueda
    ? productos.filter((producto) =>
      producto.name.toLowerCase().includes(busqueda.toLowerCase())
    )
    : productos;

  // Ordenar productos por precio
  const productosOrdenadosPorPrecio = ordenPrecio
    ? [...productosFiltradosPorBusqueda].sort((a, b) => {
      if (ordenPrecio === 'mayor-menor') return b.price - a.price;
      if (ordenPrecio === 'menor-mayor') return a.price - b.price;
      return 0;
    })
    : productosFiltradosPorBusqueda;

  return (
    <div className="carta container py-5">
      <h1 className="titulo-carta mb-4">{categoriaSeleccionada.name}</h1>

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

      {/* Filtro por tipos de hamburguesa */}
      {categoriaSeleccionada.name.toLowerCase() === 'burger' && (
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
      )}

      {/* Productos */}
      <div className="row mt-5">
        <h2 className='texto-informacion'>¡ Haz click en el producto que te guste para ver su información !</h2>
        {productosOrdenadosPorPrecio.map((producto) => (
          <div key={producto.id} className="col-12 col-md-6 col-lg-4 mb-4">
            <Link
              to={`/carta/${seccion}/${producto.name.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-decoration-none"
            >
              <div className="producto-item">
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
    </div>
  );
};

export default Carta;