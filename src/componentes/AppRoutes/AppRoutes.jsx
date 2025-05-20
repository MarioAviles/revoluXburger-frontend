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

import { menuRoutes } from './MenuRoutes/MenuRoutes';
import { reservationRoutes } from './ReservationRoutes/ReservationRoutes';
import { userRoutes } from './UserRoutes/UserRoutes';
import { imageRoutes } from './ImageRoutes/ImageRoutes';

const AppRoutes = ({ token, setToken, user, loading }) => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/carta" element={<Carta />} />
    <Route path="/reservas" element={<Reservas />} />
    <Route path="/login" element={<Login setToken={setToken} />} />
    <Route path="/registro" element={<Registro />} />
    <Route path="/carta/:seccion" element={<Carta />} />
    <Route path="/carta/:categoria/:producto" element={<DescripcionProducto />} />
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
    
    {/* Se tiene que hacer asi ya que no se pueden tener mas route dentro de un Routes
    entonces se hacen arrays de routes para poder administrarlas correctamente */}

    <Route path="*" element={<h1 className='text-center justify-content-center'><br />404 - Página no encontrada</h1>} />
  </Routes>
);

export default AppRoutes;