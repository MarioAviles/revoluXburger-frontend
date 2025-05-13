export async function getProducto(producto) {
    const fetchProductos = `https://revoluxburger-backend.onrender.com/menu`;

    const productosResponse = await fetch(fetchProductos)
        .then(response => response.json());

    // Busca el producto por su nombre formateado
    const productoEncontrado = productosResponse.find(
        item => item.name.toLowerCase().replace(/\s+/g, '-') === producto
    );

    return productoEncontrado;
}