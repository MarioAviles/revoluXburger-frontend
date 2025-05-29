import './ScrollUpDown.css'

const ScrollUpDown = () => {

      // Función para hacer scroll hacia arriba de forma suave
    function scrollup() {

        window.scrollTo({ top: 0, behavior: 'smooth' });
        
    }

    // Función para hacer scroll hacia abajo de forma suave
    function scrollDown() {
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth'
        });
    }

    return (
        <div>

            <span className="ir-arriba" onClick={scrollup} aria-label="Subir">
                <i className="bi bi-arrow-up"></i>
            </span>

            <span className="ir-abajo" onClick={scrollDown} aria-label="Bajar">
                <i className="bi bi-arrow-down"></i>     
                </span>

        </div>
    )

}

export default ScrollUpDown;