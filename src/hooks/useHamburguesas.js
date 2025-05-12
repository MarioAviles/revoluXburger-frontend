import { useEffect, useState } from "react";
import { getHamburguesas } from "../servicios/getHamburguesas";

const useHamburguesas = () => {    
    const [listaHamburguesas, setListaHamburguesas] = useState([]);
       
    function obtenerHamburguesas() {
        getHamburguesas().then(data => {
            setListaHamburguesas(data.listaHamburguesas);
        });
    }

    useEffect(obtenerHamburguesas, []);

    return listaHamburguesas;
}

export default useHamburguesas;