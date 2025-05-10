import './Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="footer py-4">
            <div className="container">
                <div className="row text-center">
                    {/* Logo */}
                    <div className="col-12 col-md-4 mb-3">
                        <img 
                            src="../../src/assets/img/logoRevoluXAmarillo.png" 
                            alt="Logo MUESTRAMELO" 
                            className="footer-logo"
                        />
                    </div>

                    {/* Ubicación */}
                    <div className="col-12 col-md-4 mb-3">
                        <h5 className="footer-title">Ubicación</h5>
                        <p className="footer-text">
                            Calle Falsa 123<br />
                            Ciudad, País<br />
                            Teléfono: +34 123 456 789
                        </p>
                    </div>

                    {/* Menú */}
                    <div className="col-12 col-md-4 mb-3">
                        <h5 className="footer-title">Menú</h5>
                        <ul className="footer-menu list-unstyled">
                            <li><Link to="/carta/hamburguesas">Hamburguesas</Link></li>
                            <li><Link to="/carta/entrantes">Entrantes</Link></li>
                            <li><Link to="/carta/bebidas">Bebidas</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="text-center mt-3">
                    <p className="footer-copy">&copy; 2025 RevoluXBurger. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;