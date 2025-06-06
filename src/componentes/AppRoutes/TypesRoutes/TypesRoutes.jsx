import { Route, Navigate } from 'react-router-dom';
import AddTipos from '../../GestionTipos/AddTipos';
import ListTipos from '../../GestionTipos/ListTipos';

export const typesRoutes = (user) => [
  <Route key="add" path="/admin/tipos/add" element={user && user.role === "ADMIN" ? <AddTipos /> : <Navigate to="/login" />} />,
  <Route key="list" path="/admin/tipos/list" element={user && user.role === "ADMIN" ? <ListTipos /> : <Navigate to="/login" />} />,
];