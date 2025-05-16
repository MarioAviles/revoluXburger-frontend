import './DescripcionProducto.css';
import { useParams } from 'react-router-dom';
import useProducto from '../../hooks/useProducto';
import AjaxLoader from '../../componentes/AjaxLoader/AjaxLoader'; // Importa el componente de carga
const DescripcionProducto = () => {
  const { producto } = useParams(); // Captura los parámetros de la URL
  const { productoSeleccionado, cargando } = useProducto(producto); // Hook para obtener el producto seleccionado
  const baseImageUrl = "https://revoluxburger-backend.onrender.com"; // URL base para las imágenes

  if (cargando) {
    return <h1 className="text-center mt-5"><AjaxLoader /></h1>; // Muestra el componente de carga mientras se obtienen los datos
  }

  if (!productoSeleccionado) {
    return <h1 className="text-center mt-5">Producto no encontrado</h1>; // Muestra un mensaje si no se encuentra el producto
  }

  return (
    <div className="descripcion-producto container py-5">
      <h1 className="titulo-producto">{productoSeleccionado.name}</h1>
      <div className="row">
        <div className="col-12 col-md-6">
          <img
            src= {`${baseImageUrl}${productoSeleccionado.imageUrl}`} // Asegúrate de que la URL de la imagen sea correcta
            alt={productoSeleccionado.name}
            className="img-fluid producto-img"
          />
        </div>
        <div className="col-12 col-md-6">
          <p className="producto-descripcion">{productoSeleccionado.description}</p> 
          <p className="producto-precio">Precio: {productoSeleccionado.price.toFixed(2)} €</p>
          <p className="producto-puntos">Puntos: {productoSeleccionado.points}</p>
        </div> 
      </div>
    </div>
  );
};

export default DescripcionProducto;