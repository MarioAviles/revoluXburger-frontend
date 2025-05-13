export async function getHamburguesas() {
    const fetchHamburguesas = `https://revoluxburger-backend.onrender.com/menu`;

    const hamburguesasResponse = await fetch(fetchHamburguesas)
        .then(response => response.json());

    const listaHamburguesas = hamburguesasResponse
        .filter(item => item.category === 'Burger') // Filtra solo las hamburguesas
        .map(hamburguesa => ({
            nombre: hamburguesa.name,
            precio: hamburguesa.price,
            imagen: hamburguesa.imageUrl
        }));
    return {
        listaHamburguesas
    };
}