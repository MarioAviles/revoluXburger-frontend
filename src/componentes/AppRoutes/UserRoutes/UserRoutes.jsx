import { Route, Navigate } from 'react-router-dom';
import AddUser from '../../../paginas/AdminPanel/Users/AddUser';
import EditUser from '../../../paginas/AdminPanel/Users/EditUser';
import UserList from '../../../paginas/AdminPanel/Users/UserList';

// Devuelve un array de <Route> para las rutas de usuarios
 export const userRoutes = (user) => [
  <Route key="add" path="/admin/users/add" element={user && user.role === "ADMIN" ? <AddUser /> : <Navigate to="/login" />} />,
  <Route key="edit" path="/admin/users/edit/:userId" element={user && user.role === "ADMIN" ? <EditUser /> : <Navigate to="/login" />} />,
  <Route key="list" path="/admin/users/list" element={user && user.role === "ADMIN" ? <UserList /> : <Navigate to="/login" />} />,
];

