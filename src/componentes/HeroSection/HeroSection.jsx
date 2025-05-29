import './HeroSection.css';
import { Link } from 'react-router-dom';
import burger from '../../assets/video/videoBurgers.mp4';
const HeroSection = () => {
  return (
    <div className="hero-section">
      <video
  className="hero-burger"
  autoPlay
  loop
  muted
  playsInline
  loading="lazy"
>
  <source src={burger} type="video/mp4" />
  Your browser does not support the video tag.
</video>

      <div className="overlay">
        <h1 className="hero-title">RevoluXBurger</h1>
        <p className="hero-subtitle">"Más que burger... ¡es <strong className='amarillo'>Revolux</strong>!"</p>
        <Link to="/carta"><button className='btn-hero'>VER AHORA</button></Link>
      </div>
    </div>
  );
};

export default HeroSection;