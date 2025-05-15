import { useEffect, useState } from "react";
import { getPostres } from "../servicios/getPostres";

const usePostres = () => {    
    const [listaPostres, setListaPostres] = useState([]);
       
    function obtenerPostres() {
        getPostres().then(data => {
            setListaPostres(data.listaPostres);
        });
    }

    useEffect(obtenerPostres, []);

    return listaPostres;
}

export default usePostres;