export async function getHamburguesas() {

    const fetchHamburguesas = `https://revoluxburger-backend.onrender.com/hamburguesas`;

    const hamburguesasResponse =  await fetch(fetchHamburguesas)
        .then(response => response.json());

    const listaHamburguesas = hamburguesasResponse.map(hamburguesa => ({
        nombre: hamburguesa.nombre
    }));

    return {
        listaHamburguesas
    };
}