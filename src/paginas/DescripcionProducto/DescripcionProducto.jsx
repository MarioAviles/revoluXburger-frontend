import './DescripcionProducto.css';
import { useParams } from 'react-router-dom';
import useProducto from '../../hooks/useProducto';

const DescripcionProducto = () => {
  const { producto } = useParams(); // Captura los parámetros de la URL
  const { productoSeleccionado, cargando } = useProducto(producto);

  if (cargando) {
    return <h1 className="text-center mt-5">Cargando producto...</h1>;
    //Aqui pondremos el ajax loader
  }

  if (!productoSeleccionado) {
    return <h1 className="text-center mt-5">Producto no encontrado</h1>;
  }

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
          <p className="producto-precio">Precio: {productoSeleccionado.price} €</p>
          <p className="producto-puntos">Puntos: {productoSeleccionado.points}</p>
        </div>
      </div>
    </div>
  );
};

export default DescripcionProducto;