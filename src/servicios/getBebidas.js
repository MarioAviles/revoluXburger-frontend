export async function getBebidas() {
    const fetchBebidas = `https://revoluxburger-backend.onrender.com/menu`;
    const baseImageUrl = "https://revoluxburger-backend.onrender.com";

    const bebidasResponse = await fetch(fetchBebidas)
        .then(response => response.json());

    const listaBebidas = bebidasResponse
        .filter(item => item.category === 'Bebida') // Filtra solo las bebidas
        .map(bebida => ({
            nombre: bebida.name,
            precio: bebida.price,
            imagen: `${baseImageUrl}${bebida.imageUrl}`
        }));

    return {
        listaBebidas
    };
}