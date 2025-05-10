/*
Contendra un formulario para que
los clientes puedan iniciar sesión o registrarse.
Los clientes podrán iniciar sesión 
con su correo electrónico y contraseña.
*/

const Login = () => {
    return (
        <div className="login">
            <h2>Iniciar Sesión</h2>
            <form>
                <div className="form-group">
                    <label htmlFor="email">Correo Electrónico</label>
                    <input type="email" id="email" required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Contraseña</label>
                    <input type="password" id="password" required />
                </div>
                <button type="submit">Iniciar Sesión</button>
            </form>
            <p>¿No tienes una cuenta? <a href="/registro">Regístrate aquí</a></p>
        </div>
    );
};
export default Login;