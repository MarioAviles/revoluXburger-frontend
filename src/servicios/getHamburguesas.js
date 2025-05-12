export async function getHamburguesas() {

    const fetchHamburguesas = `https://revoluxburger-backend.onrender.com/menu`;

    const hamburguesasResponse = await fetch(fetchHamburguesas)
        .then(response => response.json());

    const listaHamburguesas = hamburguesasResponse
        .filter(item => item.categoria === 'hamburguesas') // Filtra solo las hamburguesas
        .map(hamburguesa => ({
            nombre: hamburguesa.nombre,
            precio: hamburguesa.precio, // Incluye el precio si es necesario
            imagen: hamburguesa.imagen // Incluye la imagen si está disponible
        }));

    return {
        listaHamburguesas
    };
}