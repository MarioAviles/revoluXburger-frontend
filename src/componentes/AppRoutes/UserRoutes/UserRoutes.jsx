import { Route, Navigate } from 'react-router-dom';
import AddUser from '../../GestionUsers/AddUser';
import EditUser from '../../GestionUsers/EditUser';
import UserList from '../../GestionUsers/UserList';

// Devuelve un array de <Route> para las rutas de usuarios
 export const userRoutes = (user) => [
  <Route key="add" path="/admin/users/add" element={user && user.role === "ADMIN" ? <AddUser /> : <Navigate to="/login" />} />,
  <Route key="edit" path="/admin/users/edit/:userId" element={user && user.role === "ADMIN" ? <EditUser /> : <Navigate to="/login" />} />,
  <Route key="list" path="/admin/users/list" element={user && user.role === "ADMIN" ? <UserList /> : <Navigate to="/login" />} />,
];

