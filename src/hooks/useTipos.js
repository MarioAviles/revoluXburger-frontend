import { useEffect, useState } from "react";
import { getTipos } from "../servicios/getTipos";

const useTipos = () => {    
    const [listaTipos, setListaTipos] = useState([]);
       
    function obtenerTipos() {
        getTipos().then(data => {
            setListaTipos(data.listaTipos);
        });
    }

    useEffect(obtenerTipos, []);

    return listaTipos;
}

export default useTipos;