import { useEffect, useState } from 'react';
import './HeroSection.css';
import { Link } from 'react-router-dom';
import burger from '../../assets/video/videoBurgers.mp4';

const HeroSection = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);

    // Diferir carga del video (lazy)
    const timer = setTimeout(() => setShowVideo(true), 1000); // Carga diferida 1s
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className={`hero-section ${isMobile ? 'mobile-background' : ''}`}>
      {!isMobile && showVideo && (
        <video
          className="hero-burger"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={burger} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      <div className="overlay">
        <h1 className="hero-title">RevoluXBurger</h1>
        <p className="hero-subtitle">
          "Más que burger... ¡es <strong className='amarillo'>Revolux</strong>!"
        </p>
        <Link to="/carta">
          <button className="btn-hero">VER AHORA</button>
        </Link>
      </div>
    </div>
  );
};

export default HeroSection;
