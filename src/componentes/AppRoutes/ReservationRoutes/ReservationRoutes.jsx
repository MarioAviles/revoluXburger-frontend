import { Route, Navigate } from 'react-router-dom';
import AddReservation from '../../../paginas/AdminPanel/Reservations/AddReservation';
import EditReservation from '../../../paginas/AdminPanel/Reservations/EditReservation';
import ListReservation from '../../../paginas/AdminPanel/Reservations/ListReservation';

// Devuelve un array de <Route> para las rutas de reservas
  export const reservationRoutes = (user) => [
  <Route key="add" path="/admin/reservations/add" element={user && user.role === "ADMIN" ? <AddReservation /> : <Navigate to="/login" />} />,
  <Route key="edit" path="/admin/reservations/edit/:reservationId" element={user && user.role === "ADMIN" ? <EditReservation /> : <Navigate to="/login" />} />,
  <Route key="list" path="/admin/reservations/list" element={user && user.role === "ADMIN" ? <ListReservation /> : <Navigate to="/login" />} />,
];

