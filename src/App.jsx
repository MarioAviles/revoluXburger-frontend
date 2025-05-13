import './App.css';
import React from 'react';
import LazyLoad from 'react-lazy-load';
import { Routes, Route } from 'react-router-dom';
import Home from './paginas/Home/Home';
import Carta from './paginas/Carta/Carta';
import Reservas from './paginas/Reservas/Reservas';
import Login from './paginas/Login/Login';
import Cabecera from './componentes/Cabecera/Cabecera';
import Registro from './paginas/Registro/Registro';
import ScrollUpDown from './componentes/ScrollUpDown/ScrollUpDown';
import DescripcionProducto from './paginas/DescripcionProducto/DescripcionProducto';
const Footer = React.lazy(() => import('./componentes/Footer/Footer'));
 import { Suspense } from 'react'


function App() {
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
          <Route path="*" element={<h1><br />404 - Página no encontrada</h1>} />
        </Routes>

        <Suspense fallback={"Cargando pie de página"}>
      
              {/* En el componente Pie, estamos usando React.lazy para cargarlo de forma dinámica */}
                <LazyLoad offset={10} className='w-100'>
      
              {/* En el componente LazyLoad, estamos usando el offset para cargar 
                el componente Pie cuando esté a 250px de la vista del usuario */}

                  <Footer />
      
                </LazyLoad>
      
        </Suspense>
        <ScrollUpDown />
    </div>
  );
}

export default App;