export async function getBebidas() {

    const fetchBebidas = `https://revoluxburger-backend.onrender.com/menu`;

    const bebidasResponse = await fetch(fetchBebidas)
        .then(response => response.json());

    const listaBebidas = bebidasResponse
        .filter(item => item.categoria === 'bebidas') // Filtra solo las bebidas
        .map(bebida => ({
            nombre: bebida.nombre,
            precio: bebida.precio, // Incluye el precio si es necesario
            imagen: bebida.imagen // Incluye la imagen si está disponible
        }));

    return {
        listaBebidas
    };
}