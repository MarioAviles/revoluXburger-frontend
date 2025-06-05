import './Carta.css';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import useCategorias from '../../hooks/useCategorias';
import useMenuItems from '../../hooks/useMenuItems';
import useTipos from '../../hooks/useTipos';
import AjaxLoader from '../../componentes/AjaxLoader/AjaxLoader';
import CategoriasNavegacion from '../../componentes/CategoriasNavegacion/CategoriasNavegacion';
import FiltrosFlotantes from '../../componentes/FiltrosFlotantes/FiltrosFlotantes';
import FiltroTipos from '../../componentes/FiltroTipos/FiltroTipos';
import ListaProductos from '../../componentes/ListaProductos/ListaProductos';

const Carta = () => {
  const { seccion } = useParams();
  const [busqueda, setBusqueda] = useState('');
  const [ordenPrecio, setOrdenPrecio] = useState('');
  const [tipoSeleccionado, setTipoSeleccionado] = useState('');
  const { categorias, loading: loadingCategorias, error: errorCategorias } = useCategorias();
  const { menuItems, loading: loadingMenu, error: errorMenu } = useMenuItems();
  const { tipos, loading: loadingTipos, error: errorTipos } = useTipos();

  if (loadingCategorias || loadingMenu || loadingTipos) return (
    <div className="text-center py-5">
      <AjaxLoader />
    </div>
  );
  if (errorCategorias || errorMenu || errorTipos) return <div className="text-center py-5 text-danger">{errorCategorias || errorMenu || errorTipos}</div>;

  const categoriaSeleccionada = categorias.find(
    cat => cat.name.toLowerCase() === seccion?.toLowerCase()
  );

  if (!categoriaSeleccionada) {
    return <div>No se encontró la categoría.</div>;
  }

  let productos = menuItems.filter(
    producto => producto.categoryId === categoriaSeleccionada.id
  );

  if (categoriaSeleccionada.name.toLowerCase() === 'burger' && tipoSeleccionado) {
    productos = productos.filter(producto => producto.typeId === tipoSeleccionado);
  }

  const productosFiltradosPorBusqueda = busqueda
    ? productos.filter((producto) =>
      producto.name.toLowerCase().includes(busqueda.toLowerCase())
    )
    : productos;

  const productosOrdenadosPorPrecio = ordenPrecio
    ? [...productosFiltradosPorBusqueda].sort((a, b) => {
      if (ordenPrecio === 'mayor-menor') return b.price - a.price;
      if (ordenPrecio === 'menor-mayor') return a.price - b.price;
      return 0;
    })
    : productosFiltradosPorBusqueda;

  return (
    <div className="carta container py-5">
      <CategoriasNavegacion categorias={categorias} categoriaSeleccionada={categoriaSeleccionada} />
      <h1 className="titulo-carta mb-4">{categoriaSeleccionada.name}</h1>
      <FiltrosFlotantes
        busqueda={busqueda}
        setBusqueda={setBusqueda}
        ordenPrecio={ordenPrecio}
        setOrdenPrecio={setOrdenPrecio}
      />
      {categoriaSeleccionada.name.toLowerCase() === 'burger' && (
        <FiltroTipos
          tipos={tipos}
          tipoSeleccionado={tipoSeleccionado}
          setTipoSeleccionado={setTipoSeleccionado}
        />
      )}
      <ListaProductos productos={productosOrdenadosPorPrecio} seccion={seccion} />
    </div>
  );
};

export default Carta;