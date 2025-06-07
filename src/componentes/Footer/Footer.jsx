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
                        <h2 className="footer-title">Ubicación</h2>
                        <p className="secciones footer-text">
                            Calle Carlos III<br /> <br />
                            Cartagena, Murcia, España<br /><br />
                            Teléfono: +34 968 53 41 48
                        </p>
                    </div>

                    <div className="col-12 col-md-4 mb-3">
                        <h2 className="footer-title">Secciones</h2>
                        <p className="secciones footer-text ">
                            <Link to="/carta" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Carta</Link><br /> <br />
                            <Link to="/reservas" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Reservas</Link><br /> <br />
                            <Link to="/login" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Registro</Link>
                        </p>
                    </div>

                </div>

                <div className="text-center mt-3 ">
                    <a href="https://revoluxburger-frontend.vercel.app/" target="_blank" rel="noopener noreferrer">
                        RevoluXburger
                    </a> © 2025 by{' '}
                    <a href="https://github.com/MarioAviles" target="_blank" rel="noopener noreferrer">
                        Mario Avilés García
                    </a>{' '}is licensed under{' '}
                    <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer">
                        CC BY-SA 4.0
                    </a>
                    <img
                        src="https://mirrors.creativecommons.org/presskit/icons/cc.svg"
                        alt="Creative Commons"
                        style={{ maxWidth: '1em', maxHeight: '1em', marginLeft: '.2em' }}
                    />
                    <img
                        src="https://mirrors.creativecommons.org/presskit/icons/by.svg"
                        alt="Attribution"
                        style={{ maxWidth: '1em', maxHeight: '1em', marginLeft: '.2em' }}
                    />
                    <img
                        src="https://mirrors.creativecommons.org/presskit/icons/sa.svg"
                        alt="ShareAlike"
                        style={{ maxWidth: '1em', maxHeight: '1em', marginLeft: '.2em' }}
                    />
                </div>

            </div>

        </footer>

    );
};

export default Footer;