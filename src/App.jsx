import './App.css';
import React, { Suspense, useState } from 'react';
import Cabecera from './componentes/Cabecera/Cabecera';
import ScrollUpDown from './componentes/ScrollUpDown/ScrollUpDown';
import useAuthenticatedUser from './hooks/useAuthenticatedUser';
import AppRoutes from './componentes/AppRoutes/AppRoutes';

const Footer = React.lazy(() => import('./componentes/Footer/Footer'));

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const { user, loading } = useAuthenticatedUser();

  function manejarToken(nuevoToken) {
    if (nuevoToken) {
      localStorage.setItem('token', nuevoToken);
      setToken(nuevoToken);
    } else {
      localStorage.removeItem('token');
      setToken(null);
    }
  }

  return (
    <div className="container-fluid w-100 p-0 m-0">
      <Cabecera />
      <AppRoutes token={token} setToken={manejarToken} user={user} loading={loading} />
      <Suspense fallback={<div className='text-center justify-content-center'></div>}>
        <Footer />
      </Suspense>
      <ScrollUpDown />
    </div>
  );
}

export default App;