import './MenuDia.css';
import menuDiario from '../../assets/carta/RevoluxMenuDiario.png'; 

const MenuDia = () => {
  return (
    <div className="menu-dia-section py-5">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-12 col-md-6 text-center text-md-start mb-4 mb-md-0">
            <h2 className="titulo-menu-dia">Menú del Día</h2>
            <p className="texto-menu-dia">
              ¡Descubre nuestro delicioso menú del día!<br/> Una combinación de sabores que cambiará diariamente. 
              <br />Disfruta de una experiencia única con ingredientes frescos y de calidad.
            </p>
            <p className="texto-menu-dia">
              ¡Ven y prueba algo nuevo hoy!
            </p>
          </div>
          <div className="col-12 col-md-6 text-center">
            <img src={menuDiario} alt="Menú del Día" className="img-fluid menu-dia-img" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuDia;