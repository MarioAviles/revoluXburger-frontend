import { useEffect, useState } from "react";
import { getBebidas } from "../servicios/getBebidas";

const useBebidas = () => {    
    const [listaBebidas, setListaBebidas] = useState([]);
       
    function obtenerBebidas() {
        getBebidas().then(data => {
            setListaBebidas(data.listaBebidas);
        });
    }

    useEffect(obtenerBebidas, []);

    return listaBebidas;
}

export default useBebidas;