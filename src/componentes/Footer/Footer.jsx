import './Footer.css';
import { Link } from 'react-router-dom';
import logoRevoluX from '../../assets/img/logoRevoluXAmarillo.png';

const Footer = () => {
    return (
        <footer className="footer">

            <div className="container">

                <div className="row text-center">
                    
                    <div className="col-12 col-md-4 mb-3">
                        <img 
                            src={logoRevoluX}
                            alt="Logo RevoLuX" 
                            className="footer-logo"
                        />
                    </div>

                    <div className="col-12 col-md-4 mb-3">
                        <h5 className="footer-title">Ubicación</h5>
                        <p className="footer-text">
                            Calle Carlos III<br />
                            Cartagena, Murcia, España<br />
                            Teléfono: +34 968 53 41 48  
                        </p>
                    </div>

                    <div className="col-12 col-md-4 mb-3">
                        <h5 className="footer-title">Secciones</h5>
                        <ul className="footer-menu list-unstyled">
                            <li><Link to="/carta">Carta</Link></li>
                            <li><Link to="/reservas">Reservas</Link></li>
                            <li><Link to="/login">Registro</Link></li>
                        </ul>
                    </div>
                </div>
                
                <div className="text-center mt-3 ">
                    <p className="footer-copy">&copy; 2025 RevoluXBurger. Todos los derechos reservados.</p>
                </div>

            </div>

        </footer>

    );
};

export default Footer;