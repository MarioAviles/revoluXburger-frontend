import { useEffect, useState } from "react";
import { getProducto } from "../servicios/getProducto";

const useProducto = (producto) => {
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);
    const [cargando, setCargando] = useState(true);

    function obtenerProducto() {
        setCargando(true);
        getProducto(producto).then(data => {
            setProductoSeleccionado(data);
            setCargando(false);
        });
    }
useEffect(() => {obtenerProducto();}, [producto]);
    return { productoSeleccionado, cargando };
};

export default useProducto;