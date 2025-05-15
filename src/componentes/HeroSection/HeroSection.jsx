import './HeroSection.css';
import { Link } from 'react-router-dom';
import burger from '../../assets/video/videoBurgers.gif';
const HeroSection = () => {
  return (
    <div className="hero-section">
      <img
        src= {burger}
        alt="Hamburguesa girando"
        className="hero-burger"
      />
      <div className="overlay">
        <h1 className="hero-title">RevoluXBurger</h1>
        <p className="hero-subtitle">"Más que burger... ¡es <strong className='amarillo'>Revolux</strong>!"</p>
        <Link to="/carta"><button className='btn-hero'>VER AHORA</button></Link>
      </div>
    </div>
  );
};

export default HeroSection;