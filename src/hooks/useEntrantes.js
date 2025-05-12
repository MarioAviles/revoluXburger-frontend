import { useEffect, useState } from "react";
import { getEntrantes } from "../servicios/getEntrantes";

const useEntrantes = () => {    
    const [listaEntrantes, setListaEntrantes] = useState([]);
       
    function obtenerEntrantes() {
        getEntrantes().then(data => {
            setListaEntrantes(data.listaEntrantes);
        });
    }

    useEffect(obtenerEntrantes, []);

    return listaEntrantes;
}

export default useEntrantes;