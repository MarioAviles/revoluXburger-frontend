export async function getEntrantes() {
    const fetchEntrantes = `https://revoluxburger-backend.onrender.com/entrantes`;

    const entrantesResponse =  await fetch(fetchEntrantes)
        .then(response => response.json());

    const listaEntrantes = entrantesResponse.map(entrante => ({
        nombre: entrante.nombre
    }));

    return {
        listaEntrantes
    };
}