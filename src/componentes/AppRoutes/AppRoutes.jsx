import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../../paginas/Home/Home';
import Carta from '../../paginas/Carta/Carta';
import Reservas from '../../paginas/Reservas/Reservas';
import Login from '../../paginas/Login/Login';
import Registro from '../../paginas/Registro/Registro';
import DescripcionProducto from '../../paginas/DescripcionProducto/DescripcionProducto';
import UserPanel from '../../paginas/UserPanel/UserPanel';
import AdminPanel from '../../paginas/AdminPanel/AdminPanel';
import AjaxLoader from '../AjaxLoader/AjaxLoader';
import Carrito from '../../paginas/Carrito/Carrito';
import ResetPassword from '../../componentes/ResetPassword/ResetPassword';
import ForgotPassword from '../../componentes/ForgotPassword/ForgotPassword';
import Pagina404 from '../../componentes/Pagina404/Pagina404';

import { menuRoutes } from './MenuRoutes/MenuRoutes';
import { reservationRoutes } from './ReservationRoutes/ReservationRoutes';
import { userRoutes } from './UserRoutes/UserRoutes';
import { imageRoutes } from './ImageRoutes/ImageRoutes';
import { categoriesRoutes } from './CategoriesRoutes/CategoriesRoutes';
import { typesRoutes } from './TypesRoutes/TypesRoutes';
import CartaSeccion from '../CartaSeccion/CartaSeccion';
const AppRoutes = ({ token, setToken, user, loading }) => (
  <Routes>

    {/* Rutas públicas */}
    <Route path="/" element={<Home />} />
    <Route path="/carta" element={<CartaSeccion />} />
    <Route path="/reservas" element={<Reservas />} />
    <Route path="/login" element={<Login setToken={setToken} />} />
    <Route path="/registro" element={<Registro />} />
    <Route path="/carta/:seccion" element={<Carta />} />
    <Route path="/carta/:categoria/:producto" element={<DescripcionProducto />} />
    <Route path="/carrito" element={<Carrito />} />

    {/* Rutas de restablecimiento de contraseña */}
    <Route path="/forgot-password" element={<ForgotPassword />} />
    <Route path="/reset-password" element={<ResetPassword />} />   
    
     {/* Rutas protegidas */}
    <Route path="/panel" element={token ? <UserPanel setToken={setToken} /> : <Navigate to="/login" />} />

    <Route path="/admin-panel" element={
      loading ? (<div className="text-center py-5"><AjaxLoader /></div>)
        : user && user.role === "ADMIN" ? (<AdminPanel />)
        : (<div className="text-center py-5 text-danger"><h2>Permiso denegado</h2></div>)
    } />

    {/* Secciones agrupadas */}
    {menuRoutes(user)}
    {reservationRoutes(user)}
    {userRoutes(user)}
    {imageRoutes(user)}
    {categoriesRoutes(user)}
    {typesRoutes(user)}

    <Route path="*" element={<Pagina404 />} />  </Routes>
);

export default AppRoutes;