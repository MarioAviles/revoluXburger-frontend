import { useCart } from "../../contextos/CartContext";
import { useState } from "react";
import PopUpCarrito from "../../componentes/PopUpCarrito/PopUpCarrito";
import useUserData from "../../hooks/useUserData";
import { Link } from "react-router-dom";
import "./Carrito.css";
import { sumarPuntosUsuario } from "../../servicios/userService";

const Carrito = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const [showPopup, setShowPopup] = useState(false);
  const [agradecimiento, setAgradecimiento] = useState("");
  const { user } = useUserData();

  const total = cart.reduce((acc, item) => acc + ((item.points/6) * item.quantity), 0);

  const finalizarCompra = async () => {
    setShowPopup(false);
    clearCart();
    if (user && user.id) {
      try {
        const token = localStorage.getItem("token");
        await sumarPuntosUsuario(user.id, total, token);
        setAgradecimiento(`¡Gracias por tu compra! Has ganado ${total} puntos.`);
      } catch (e) {
        setAgradecimiento("¡Gracias por tu compra! (No se pudieron sumar los puntos)");
      }
    } else {
      setAgradecimiento("¡Gracias por comprar!");
    }
  };

  if (agradecimiento) {
    return (
      <div className="container py-5 text-center">
        <h2>{agradecimiento}</h2>
        <Link to="/carta" className="btn btn-warning mt-3">Seguir comprando</Link>
      </div>
    );
  }

  if (cart.length === 0)
    return (
      <div className="container py-5 text-center">
        <h2>Tu carrito está vacío</h2>
        <Link to="/carta" className="btn btn-warning mt-3">Ir a la carta</Link>
      </div>
    );

  return (
    <div className="container py-5">
      <h2>Mi Carrito</h2>
      <ul className="list-group mb-3">
        {cart.map(item => (
          <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
            <span>
              {item.name} x{item.quantity}
            </span>
            <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(item.id)}>
              Quitar
            </button>
          </li>
        ))}
      </ul>
      <div className="mb-3"><p className="texto-carrito">Total de puntos : {total} XCoins</p></div>

      <div className="mb-3 align-items-center text-center justify-content-center">
        <button className="btn btn-secondary" onClick={clearCart}>Vaciar carrito</button>
        <button
          className="btn btn-success ms-5"
          onClick={() => setShowPopup(true)}
          disabled={cart.length === 0}
        >
          Finalizar compra
        </button>
      </div>

      {showPopup && (
        <PopUpCarrito
          mensaje="¿Seguro que quieres finalizar la compra?"
          onCancel={() => setShowPopup(false)}
          onConfirm={finalizarCompra}
        />
      )}
    </div>
  );
};

export default Carrito;