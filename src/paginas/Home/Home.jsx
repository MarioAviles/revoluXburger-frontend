import HeroSection from '../../componentes/HeroSection/HeroSection';
import CartaSeccion from '../../componentes/CartaSeccion/CartaSeccion';
import PuntosBurger from '../../componentes/PuntosBurger/PuntosBurger';
import MenuDia from '../../componentes/MenuDia/MenuDia';
import SeccionContadores from '../../componentes/SeccionContadores/SeccionContadores';

const Home = () => {
  return (
    <div className="container-fluid w-100 m-0 p-0 text-center">
      <HeroSection />
      <CartaSeccion />
      <PuntosBurger />
      <MenuDia />
      <SeccionContadores />
    </div>
  );
};

export default Home;