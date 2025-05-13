import './App.css';
import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './paginas/Home/Home';
import Carta from './paginas/Carta/Carta';
import Reservas from './paginas/Reservas/Reservas';
import Login from './paginas/Login/Login';
import Cabecera from './componentes/Cabecera/Cabecera';
import Registro from './paginas/Registro/Registro';
import ScrollUpDown from './componentes/ScrollUpDown/ScrollUpDown';
import DescripcionProducto from './paginas/DescripcionProducto/DescripcionProducto';
import UserPanel from './paginas/UserPanel/UserPanel'; // Importa el panel de usuario

const Footer = React.lazy(() => import('./componentes/Footer/Footer'));

function App() {
  const isAuthenticated = localStorage.getItem('token'); // Verifica si el usuario está autenticado

  return (
    <div className="container-fluid w-100 p-0 m-0">
      <Cabecera />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/carta" element={<Carta />} />
        <Route path="/reservas" element={<Reservas />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/carta/:seccion" element={<Carta />} />
        <Route path="/carta/:categoria/:producto" element={<DescripcionProducto />} />
        <Route
          path="/panel"
          element={isAuthenticated ? <UserPanel /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<h1><br />404 - Página no encontrada</h1>} />
      </Routes>
      <Suspense fallback={<div>Cargando pie de página...</div>}>
        <Footer />
      </Suspense>
      <ScrollUpDown />
    </div>
  );
}

export default App;