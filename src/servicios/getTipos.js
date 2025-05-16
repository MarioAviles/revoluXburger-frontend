export async function getTipos() {
    const fetchTipos = `https://revoluxburger-backend.onrender.com/menu`;

    const tiposResponse = await fetch(fetchTipos)
        .then(response => response.json());

    // Extrae categorías únicas y las mapea correctamente
    const listaTipos = [...new Set(tiposResponse.map(item => item.type))] 
        .map(tipo => ({
            nombre: tipo 
        }));

    return {
        listaTipos
    };
}

