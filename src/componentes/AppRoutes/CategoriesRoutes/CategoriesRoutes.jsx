import { Route, Navigate } from 'react-router-dom';
import AddCategories from '../../GestionCategorias/AddCategories';
import ListCategories from '../../GestionCategorias/ListCategories';

export const categoriesRoutes = (user) => [
  <Route key="add" path="/admin/categories/add" element={user && user.role === "ADMIN" ? <AddCategories /> : <Navigate to="/login" />} />,
  <Route key="list" path="/admin/categories/list" element={user && user.role === "ADMIN" ? <ListCategories /> : <Navigate to="/login" />} />,
];