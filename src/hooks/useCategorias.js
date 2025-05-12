import { useEffect, useState } from "react";
import { getCategorias } from "../servicios/getCategorias";

const useCategorias = () => {    
    const [listaCategorias, setListaCategorias] = useState([]);
       
    function obtenerCategorias() {
        getCategorias().then(data => {
            setListaCategorias(data.listaCategorias);
        });
    }

    useEffect(obtenerCategorias, []);

    return listaCategorias;
}

export default useCategorias;