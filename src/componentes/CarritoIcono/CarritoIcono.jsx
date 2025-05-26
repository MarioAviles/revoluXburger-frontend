import "./CarritoIcono.css";
import { useCart } from "../../contextos/CartContext";
import { Link } from "react-router-dom";
import { div } from "motion/react-client";

const CarritoIcono = () => {
  const { cart } = useCart();
  const cantidad = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="carrito-icono-link" title="Ir a mi carrito">
      <i className="bi bi-cart"></i>
      {cantidad > 0 && (
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill">
          {cantidad}
        </span>
      )}
    </div>
  );
};
export default CarritoIcono;