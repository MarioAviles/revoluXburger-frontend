export async function getEntrantes() {
    const fetchEntrantes = `https://revoluxburger-backend.onrender.com/menu`;

    const entrantesResponse = await fetch(fetchEntrantes)
        .then(response => response.json());

    const listaEntrantes = entrantesResponse
        .filter(item => item.category === 'Entrante') // Filtra solo los entrantes
        .map(entrante => ({
            nombre: entrante.name,
            precio: entrante.price,
            imagen: entrante.imageUrl
        }));
        
    return {
        listaEntrantes
    };
}