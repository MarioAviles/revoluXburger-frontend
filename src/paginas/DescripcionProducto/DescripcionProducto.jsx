import './DescripcionProducto.css';
import { useParams } from 'react-router-dom';
import useProducto from '../../hooks/useProducto';
import useCategorias from '../../hooks/useCategorias';
import AjaxLoader from '../../componentes/AjaxLoader/AjaxLoader';

const DescripcionProducto = () => {
  const { producto } = useParams();
  const { productoSeleccionado, cargando } = useProducto(producto);
  const { categorias, loading: loadingCategorias } = useCategorias();

  if (cargando || loadingCategorias) {
    return <h1 className="text-center mt-5"><AjaxLoader /></h1>;
  }

  if (!productoSeleccionado) {
    return <h1 className="text-center mt-5">Producto no encontrado</h1>;
  }

  // Buscar la categoría Burger
  const categoriaBurger = categorias.find(cat => cat.name === "Burger");
  const esBurger = categoriaBurger && productoSeleccionado.categoryId === categoriaBurger.id;

  return (
    <div className="descripcion-producto container py-5">
      <h1 className="titulo-producto">{productoSeleccionado.name}</h1>
      <div className="row">
        <div className="col-12 col-md-6">
          <img
            src={productoSeleccionado.imageUrl}
            alt={productoSeleccionado.name}
            className="img-fluid producto-img"
          />
        </div>
        <div className="col-12 col-md-6">
          <p className="producto-descripcion">{productoSeleccionado.description}</p>
          <div className='informacion-producto'>
            <p className="producto-precio">Precio: {productoSeleccionado.price.toFixed(2)} €</p>
            <p className="producto-puntos">Puntos: {productoSeleccionado.points}</p>
            {esBurger && (
              <p className="producto-puntos">Tipo: {productoSeleccionado.type}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DescripcionProducto;