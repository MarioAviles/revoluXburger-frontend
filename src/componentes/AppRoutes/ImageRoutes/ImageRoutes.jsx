import { Route, Navigate } from 'react-router-dom';
import AddImage from '../../../paginas/AdminPanel/Images/AddImage';
import DeleteImage from '../../../paginas/AdminPanel/Images/DeleteImage';
import ViewImages from '../../../paginas/AdminPanel/Images/ViewImages';

// Devuelve un array de <Route> para las rutas de imágenes
 export const imageRoutes = (user) => [
  <Route key="add" path="/admin/images/add" element={user && user.role === "ADMIN" ? <AddImage /> : <Navigate to="/login" />} />,
  <Route key="list" path="/admin/images/list" element={user && user.role === "ADMIN" ? <ViewImages /> : <Navigate to="/login" />} />,
];

