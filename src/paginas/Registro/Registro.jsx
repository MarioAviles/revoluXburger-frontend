import './Registro.css';
import { Link } from 'react-router-dom';
const Registro = () => {
    return (
       
         <div className="registro container text-center">
            <h1>Registrate </h1>
            <form className='text-center align-items-center justify-content-center flex-column'>
                <div className="mb-3">
                    <label htmlFor="email">Correo Electrónico</label>
                    <input type="email" id="email" required />
                </div>
                  <div className="mb-3">
                     <label htmlFor="password">Contraseña</label>
                    <input type="password" id="password" required />
                </div>  
                <button type="submit" className="btn btn-custom">Registrarse</button>
            </form>
              <p>¿Tienes una cuenta? <br /><br /><Link to="/login">Iniciar sesión ahora</Link></p>
        </div>
    );
};

export default Registro;