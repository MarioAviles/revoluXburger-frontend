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

const Footer = React.lazy(() => import('./componentes/Footer/Footer'));

function App() {
  // Estado para el token
  const [token, setToken] = useState(localStorage.getItem('token'));

  // Función para actualizar el token desde Login o Panel
  const handleSetToken = (newToken) => {
    if (newToken) {
      localStorage.setItem('token', newToken);
      setToken(newToken);
    } else {
      localStorage.removeItem('token');
      setToken(null);
    }
  };

  return (
    <div className="container-fluid w-100 p-0 m-0">
      <Cabecera />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/carta" element={<Carta />} />
        <Route path="/reservas" element={<Reservas />} />
        <Route path="/login" element={<Login setToken={handleSetToken} />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/carta/:seccion" element={<Carta />} />
        <Route path="/carta/:categoria/:producto" element={<DescripcionProducto />} />
        <Route path="/panel"
          element={token ? <UserPanel setToken={handleSetToken} /> : <Navigate to="/login" />} />
        <Route path="*" element={<h1 className='text-center justify-content-center'>
          <br />404 - Página no encontrada</h1>} />
      </Routes>
      <Suspense fallback={<div className='text-center justify-content-center'>Cargando pie de página...</div>}>
        <Footer />
      </Suspense>
      <ScrollUpDown />
    </div>
  );
}

export default App;