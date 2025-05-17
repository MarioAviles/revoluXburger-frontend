export async function getPostres() {
    const fetchPostres = `https://revoluxburger-backend.onrender.com/menu`;

    const postresResponse = await fetch(fetchPostres)
        .then(response => response.json());

    const listaPostres = postresResponse
        .filter(item => item.category === 'Postre') // Filtra solo los postres
        .map(postre => ({
            nombre: postre.name,
            precio: postre.price,
            imagen: postre.imageUrl
        }));
        
    return {
        listaPostres
    };
}