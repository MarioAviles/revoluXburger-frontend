import './UserPanel.css';

import useAuthenticatedUser from '../../hooks/useAuthenticatedUser';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AjaxLoader from '../../componentes/AjaxLoader/AjaxLoader';
import AvatarPanel from './AvatarPanel/AvatarPanel';
import Popup from './Popup/Popup';
import ReservasList from './ReservasList/ReservasList';
import UserInfoBox from './UserInfoBox/UserInfoBox';
import { useCart } from "../../contextos/CartContext";

const UserPanel = ({ setToken }) => {
  const { user, loading } = useAuthenticatedUser(); // Hook para obtener el usuario autenticado
  const navigate = useNavigate(); // Hook para la navegación
  const [reservas, setReservas] = useState(user?.reservations || []); // Estado para las reservas
  const [popup, setPopup] = useState(null); // Estado para el popup
  const { clearCart } = useCart();

  useEffect(() => {
    setReservas(user?.reservations || []); 
  }, [user]); // Actualiza reservas cuando el usuario cambia

  useEffect(() => {
    if (!loading && !user) {
      setToken(null);
      navigate('/login', { replace: true }); // Redirige a login si no hay usuario
    }
  }, [loading, user, setToken, navigate]);

  // Función para mostrar popup con duración personalizada
  const popupHandler = (msg, ms = 3000) => {
    setPopup(msg); // Mostrar popup con el mensaje
    setTimeout(() => setPopup(null), ms); // Ocultar popup después de ms milisegundos
  };

  if (loading || !user) {
    return (
      <div className="user-panel container py-5">
        <h1 className="text-center"><AjaxLoader /></h1> /
      </div>
    );
  }

  return (
    <div className="user-panel container py-5 d-flex flex-column align-items-center mt-5 mb-5">
      <AvatarPanel username={user.username} /> {/* Componente para mostrar el avatar y nombre de usuario */}
      <UserInfoBox email={user.email} points={user.points} /> {/* Componente para mostrar información del usuario */}
      {user.role === "ADMIN" && (
        <button
          className="btn btn-warning mt-2 mb-2"
          onClick={() => window.location.href = '/admin-panel'} // Redirige al panel de administración
        >
          Ir al Panel de Administración
        </button>
      )}

      {user.role === "USER" && (
        <ReservasList reservas={reservas} setReservas={setReservas} popupHandler={popupHandler} />
      )} {/* Componente para mostrar la lista de reservas */}

      <button
        className="btn btn-danger mt-2"
        onClick={() => {
            if (user && user.id) {
              setToken(null);
              navigate('/login'); // Redirige a login y limpia el token
              localStorage.removeItem('token'); // Elimina el token del almacenamiento local
              localStorage.removeItem(`cart_${user.id}`);
              clearCart(); // <-- Limpia el carrito en memoria
            }
        }}
      >
        Cerrar Sesión
      </button> 
      <Popup popup={popup} /> {/* Componente para mostrar el popup */}
    </div>
  );
};

export default UserPanel;