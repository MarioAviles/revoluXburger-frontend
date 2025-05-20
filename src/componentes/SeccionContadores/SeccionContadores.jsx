import './SeccionContadores.css';
import ContadorClientes from '../Contadores/ContadorClientes/ContadorClientes';
import ContadorHamburguesas from '../Contadores/ContadorHamburguesas/ContadorHamburguesas';
import ContadorReseñas from '../Contadores/ContadorReseñas/ContadorReseñas';

const SeccionContadores = () => (
  <section className="seccion-contadores py-5">
    <div className="container contenedor-contadores">
      <h2 className="titulo-contadores mb-5">¡Nuestras cifras hablan por sí solas!</h2>
      <div className="row justify-content-center align-items-center d-flex flex-column flex-md-row">
        <div className="col-12 col-md-3 mb-4 mb-md-0  align-items-center px-5">
          <div className="contador-icono mb-2">
            <i className="bi bi-people-fill"></i>
          </div>
          <ContadorClientes />
          <span className="contador-label">Clientes revoluX</span>
        </div>
        <div className="col-12 col-md-3 mb-4 mb-md-0  align-items-center px-5">
          <div className="contador-icono mb-2">
            <i className="bi bi-cup-straw"></i>
          </div>
          <ContadorHamburguesas />
          <span className="contador-label">Productos servidos</span>
        </div>
        <div className="col-12 col-md-3 align-items-center px-5">
          <div className="contador-icono mb-2">
            <i className="bi bi-star-fill"></i>
          </div>
          <ContadorReseñas />
          <span className="contador-label">Reseñas positivas</span>
        </div>
      </div>
    </div>
  </section>
);

export default SeccionContadores;