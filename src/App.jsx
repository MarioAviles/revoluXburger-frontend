import './App.css';
import React, { Suspense, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './paginas/Home/Home';
import Carta from './paginas/Carta/Carta';
import Reservas from './paginas/Reservas/Reservas';
import Login from './paginas/Login/Login';
import Cabecera from './componentes/Cabecera/Cabecera';
import Registro from './paginas/Registro/Registro';
import ScrollUpDown from './componentes/ScrollUpDown/ScrollUpDown';
import DescripcionProducto from './paginas/DescripcionProducto/DescripcionProducto';
import UserPanel from './paginas/UserPanel/UserPanel';
import AdminPanel from './paginas/AdminPanel/AdminPanel';
import useAuthenticatedUser from './hooks/useAuthenticatedUser';
import AjaxLoader from './componentes/AjaxLoader/AjaxLoader';
import AddMenuItem from './paginas/AdminPanel/MenuItems/AddMenuItem';
import EditMenuItem from './paginas/AdminPanel/MenuItems/EditMenuItem';
import DeleteMenuItem from './paginas/AdminPanel/MenuItems/DeleteMenuItem';
import MenuItemList from './paginas/AdminPanel/MenuItems/MenuItemList';

import AddReservation from './paginas/AdminPanel/Reservations/AddReservation';
import EditReservation from './paginas/AdminPanel/Reservations/EditReservation';
import DeleteReservation from './paginas/AdminPanel/Reservations/DeleteReservation';
import ListReservation from './paginas/AdminPanel/Reservations/ListReservation';

import AddUser from './paginas/AdminPanel/Users/AddUser';
import EditUser from './paginas/AdminPanel/Users/EditUser';
import DeleteUser from './paginas/AdminPanel/Users/DeleteUser';
import UserList from './paginas/AdminPanel/Users/UserList';
const Footer = React.lazy(() => import('./componentes/Footer/Footer'));

function App() {

  // Estado para el token
 const [token, setToken] = useState(localStorage.getItem('token')); // Inicializa el token desde el localStorage
 const { user, loading } = useAuthenticatedUser(); // Hook para obtener el usuario autenticado

  // Función para actualizar el token desde Login o Panel
  function handleSetToken(newToken){
    if (newToken) {
      localStorage.setItem('token', newToken); // Guarda el token en el localStorage
      setToken(newToken);
    } else {
      localStorage.removeItem('token'); 
      setToken(null); // Elimina el token del localStorage
    }
  };

  return (
    <div className="container-fluid w-100 p-0 m-0">
      <Cabecera />
      <Routes>
        <Route path="/" element={<Home />} /> {/* Página de inicio */}
        <Route path="/carta" element={<Carta />} /> {/* Página de carta */}
        <Route path="/reservas" element={<Reservas />} /> {/* Página de reservas */}
        <Route path="/login" element={<Login setToken={handleSetToken} />} /> {/* Página de login */}
        <Route path="/registro" element={<Registro />} /> {/* Página de registro */}
        <Route path="/carta/:seccion" element={<Carta />} /> {/* Página de carta por sección */}
        <Route path="/carta/:categoria/:producto" element={<DescripcionProducto />} /> {/* Página de descripción del producto */}
        <Route path="/panel" element={token ? <UserPanel setToken={handleSetToken} /> 
                                            : <Navigate to="/login" />} /> {/* Página de usuario autenticado */}
        <Route path="/admin-panel" element={
            loading ? (<div className="text-center py-5"><AjaxLoader /></div> ) 
                    : user && user.role === "ADMIN" ? ( <AdminPanel /> ) 
                    : (<div className="text-center py-5 text-danger"><h2>Permiso denegado</h2></div>)
        }/>  {/* Página de administración */}

        <Route path="*" element={<h1 className='text-center justify-content-center'>
          <br />404 - Página no encontrada</h1>} /> {/* Página de error 404 */}

         
        {/* Rutas CRUD Menú */}
      
      <Route path="/admin/menu/add" element={user && user.role === "ADMIN" ? <AddMenuItem /> : <Navigate to="/login" />} />
      <Route path="/admin/menu/edit" element={user && user.role === "ADMIN" ? <EditMenuItem /> : <Navigate to="/login" />} />
      <Route path="/admin/menu/delete" element={user && user.role === "ADMIN" ? <DeleteMenuItem /> : <Navigate to="/login" />} />
      <Route path="/admin/menu/list" element={user && user.role === "ADMIN" ? <MenuItemList /> : <Navigate to="/login" />} />
      
        {/* Rutas CRUD Reservas */}
      
      <Route path="/admin/reservations/add" element={user && user.role === "ADMIN" ? <AddReservation /> : <Navigate to="/login" />} />
      <Route path="/admin/reservations/edit" element={user && user.role === "ADMIN" ? <EditReservation /> : <Navigate to="/login" />} />
      <Route path="/admin/reservations/delete" element={user && user.role === "ADMIN" ? <DeleteReservation /> : <Navigate to="/login" />} />
      <Route path="/admin/reservations/list" element={user && user.role === "ADMIN" ? <ListReservation /> : <Navigate to="/login" />} />
      
        {/* Rutas CRUD Usuarios */}

      <Route path="/admin/users/add" element={user && user.role === "ADMIN" ? <AddUser /> : <Navigate to="/login" />} />
      <Route path="/admin/users/edit" element={user && user.role === "ADMIN" ? <EditUser /> : <Navigate to="/login" />} />
      <Route path="/admin/users/delete" element={user && user.role === "ADMIN" ? <DeleteUser /> : <Navigate to="/login" />} />
      <Route path="/admin/users/list" element={user && user.role === "ADMIN" ? <UserList /> : <Navigate to="/login" />} />

      </Routes>

      {/* Carga el pie de página de forma diferida */}
      <Suspense fallback={<div className='text-center justify-content-center'></div>}>
        <Footer />
      </Suspense>
      <ScrollUpDown /> {/* Componente para desplazarse hacia arriba */}

    </div>
  );
}

export default App;