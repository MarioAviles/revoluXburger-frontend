export async function getBebidas() {
    const fetchBebidas = `https://revoluxburger-backend.onrender.com/menu`;

    const bebidasResponse = await fetch(fetchBebidas)
        .then(response => response.json());

    const listaBebidas = bebidasResponse
        .filter(item => item.category === 'Bebida') // Filtra solo las bebidas
        .map(bebida => ({
            nombre: bebida.name,
            precio: bebida.price,
            imagen: bebida.imageUrl
        }));

    return {
        listaBebidas
    };
}