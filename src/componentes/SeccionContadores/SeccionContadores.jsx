import React, { useEffect, useState, useRef } from 'react';
import './SeccionContadores.css';
import ContadorClientes from '../Contadores/ContadorClientes/ContadorClientes';
import ContadorHamburguesas from '../Contadores/ContadorHamburguesas/ContadorHamburguesas';
import ContadorReseñas from '../Contadores/ContadorReseñas/ContadorReseñas';

const SeccionContadores = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Deja de observar una vez que es visible
        }
      },
      { threshold: 0.8 } // El 80% del componente debe estar visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="seccion-contadores py-5">
      <div className="container contenedor-contadores">
        <h2 className="titulo-contadores mb-5">¡Nuestras cifras hablan por sí solas!</h2>
        <div className="row justify-content-center align-items-center d-flex flex-column flex-md-row">
          {isVisible && (
            <>
              <div className="col-12 col-md-3 mb-4 mb-md-0 align-items-center px-5">
                <div className="contador-icono mb-2">
                  <i className="bi bi-people-fill"></i>
                </div>
                <ContadorClientes />
                <span className="contador-label">Clientes revoluX</span>
              </div>
              <div className="col-12 col-md-3 mb-4 mb-md-0 align-items-center px-5">
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
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default SeccionContadores;