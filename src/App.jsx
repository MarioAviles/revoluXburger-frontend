import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './paginas/Home/Home';
import Carta from './paginas/Carta/Carta';
import Reservas from './paginas/Reservas/Reservas';
import Login from './paginas/Login/Login';
import Cabecera from './componentes/Cabecera/Cabecera';
import Footer from './componentes/Footer/Footer';
import Registro from './paginas/Registro/Registro';

function App() {
  return (
    <div className="container-fluid p-0 m-0">
      <Cabecera />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/carta" element={<Carta />} />
          <Route path="/reservas" element={<Reservas />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/carta/:seccion" element={<Carta />} />
          <Route path="*" element={<h1><br />404 - Página no encontrada</h1>} />
        </Routes>
      <Footer />
    </div>
  );
}

export default App;