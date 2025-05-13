import './ScrollUpDown.css'

const ScrollUpDown = () => {

    // Función para hacer scroll hacia arriba
    function scrollup() {

        // Con window.scrollTo(0, 0) hacemos scroll hacia arriba siendo el primer 0 el eje X (Derecha, Izquierda).

        window.scrollTo(0, 0);
    }

    // Función para hacer scroll hacia abajo

    function scrollDown() {

        // Con window.scrollTo(0, document.body.scrollHeight) hacemos scroll hacia abajo siendo 0 el eje X (Derecha, Izquierda)
        window.scrollTo(0, document.body.scrollHeight);
    }

    return (
        <div>
            <span className="ir-arriba"
                id="button-up"
                onClick={scrollup}>^
            </span>
            <span className="ir-abajo girada"
                id="button-down"
                onClick={scrollDown}>^
            </span>

        </div>
    )

}

export default ScrollUpDown;