export async function getEntrantes() {

    const fetchEntrantes = `https://revoluxburger-backend.onrender.com/menu`;

    const entrantesResponse = await fetch(fetchEntrantes)
        .then(response => response.json());

    const listaEntrantes = entrantesResponse
        .filter(item => item.categoria === 'entrantes') // Filtra solo los entrantes
        .map(entrante => ({
            nombre: entrante.nombre,
            precio: entrante.precio, // Incluye el precio si es necesario
            imagen: entrante.imagen // Incluye la imagen si está disponible
        }));

    return {
        listaEntrantes
    };
}