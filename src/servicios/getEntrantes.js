export async function getEntrantes() {
    const fetchEntrantes = `https://revoluxburger-backend.onrender.com/menu`;
    const baseImageUrl = "https://revoluxburger-backend.onrender.com";

    const entrantesResponse = await fetch(fetchEntrantes)
        .then(response => response.json());

    const listaEntrantes = entrantesResponse
        .filter(item => item.category === 'Entrante') // Filtra solo los entrantes
        .map(entrante => ({
            nombre: entrante.name,
            precio: entrante.price,
            imagen: `${baseImageUrl}${entrante.imageUrl}`
        }));
        
    return {
        listaEntrantes
    };
}