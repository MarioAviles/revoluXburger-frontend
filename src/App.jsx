import './App.css';
import React, { Suspense, useEffect, useState } from 'react';
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

const [estaAutenticado, setEstaAutenticado] = useState(false); // Estado para manejar la autenticación

  // Función para verificar si el usuario está autenticado
  function verificarAutenticacion() {
    const token = localStorage.getItem('token'); // Obtiene el token del almacenamiento local
    setEstaAutenticado(!!token); // Actualiza el estado según si el token existe
  };

  function inicializarAutenticacion() {
    verificarAutenticacion(); // Verifica la autenticación al cargar la aplicación

    function manejarCambioEnStorage() {
      verificarAutenticacion();
      //Funcion que se ejecuta cuando hay un cambio en el localStorage
    };

    window.addEventListener('storage', manejarCambioEnStorage); // Escucha cambios en localStorage por si 
    // el token se agrega o elimina desde otra pestaña

    return () => {
      window.removeEventListener('storage', manejarCambioEnStorage);
    };
  };

  // useEffect que se ejecuta una vez para inicializar la autenticación
  useEffect(inicializarAutenticacion, []);

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
          element={estaAutenticado ? <UserPanel /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<h1 className='text-center justify-content-center'><br />404 - Página no encontrada</h1>} />
      </Routes>
      <Suspense fallback={<div className='text-center justify-content-center'>Cargando pie de página...</div>}>
        <Footer />
      </Suspense>
      <ScrollUpDown />
    </div>
  );
}

export default App;