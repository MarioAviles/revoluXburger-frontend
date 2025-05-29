import './Footer.css';
import { Link } from 'react-router-dom';
import logoRevoluX from '../../assets/img/logoRevoluXAmarillo.png';

const Footer = () => {
    return (
        <footer className="footer">

            <div className="container-fluid ">

                <div className="row text-center">

                    <div className="col-12 col-md-4 mb-3">
                        <Link
                            to="/"
                            className="d-block text-center my-2"
                            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                        >
                            <img src={logoRevoluX} alt="Logo RevoluX" className="logo" />
                        </Link>
                    </div>

                    <div className="col-12 col-md-4 mb-3">
                        <h5 className="footer-title">Ubicación</h5>
                        <p className="footer-text">
                            Calle Carlos III<br /> <br />
                            Cartagena, Murcia, España<br /><br />
                            Teléfono: +34 968 53 41 48
                        </p>
                    </div>

                    <div className="col-12 col-md-4 mb-3">
                        <h5 className="footer-title">Secciones</h5>
                        <p className="secciones footer-text ">
                            <Link to="/carta" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Carta</Link><br /> <br />
                            <Link to="/reservas" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Reservas</Link><br /> <br />
                            <Link to="/login" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Registro</Link>
                        </p>
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