import './ScrollUpDown.css'

const ScrollUpDown = () => {

      // Función para hacer scroll hacia arriba de forma suave
    function scrollup() {
        // Usamos scrollIntoView para ir al principio de la página de forma suave
        document.documentElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Función para hacer scroll hacia abajo de forma suave
    function scrollDown() {
        // Usamos scrollIntoView para ir al final de la página de forma suave
        document.documentElement.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }

    return (
        <div>

            <span className="ir-arriba" onClick={scrollup} aria-label="Subir">
                ↑
            </span>

            <span className="ir-abajo" onClick={scrollDown} aria-label="Bajar">
                ↓
            </span>

        </div>
    )

}

export default ScrollUpDown;