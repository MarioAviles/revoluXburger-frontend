export async function getBebidas() {
    const fetchBebidas = `https://revoluxburger-backend.onrender.com/bebidas`;

    const bebidasResponse =  await fetch(fetchBebidas)
        .then(response => response.json());

    const listaBebidas = bebidasResponse.map(bebida => ({
        nombre: bebida.nombre
    }));

    return {
        listaBebidas
    };
}