import { Route, Navigate } from 'react-router-dom';
import AddMenuItem from '../../../paginas/AdminPanel/MenuItems/AddMenuItem';
import EditMenuItem from '../../../paginas/AdminPanel/MenuItems/EditMenuItem';
import MenuItemList from '../../../paginas/AdminPanel/MenuItems/MenuItemList';

 export const menuRoutes = (user) => [
  <Route key="add" path="/admin/menu/add" element={user && user.role === "ADMIN" ? <AddMenuItem /> : <Navigate to="/login" />} />,
  <Route key="edit" path="/admin/menu/edit/:menuItemId" element={user && user.role === "ADMIN" ? <EditMenuItem /> : <Navigate to="/login" />} />,
  <Route key="list" path="/admin/menu/list" element={user && user.role === "ADMIN" ? <MenuItemList /> : <Navigate to="/login" />} />,
];

