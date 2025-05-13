export async function getCategorias() {
    const fetchCategorias = `https://revoluxburger-backend.onrender.com/menu`;

    const categoriasResponse = await fetch(fetchCategorias)
        .then(response => response.json());

    // Extrae categorías únicas y las mapea correctamente
    const listaCategorias = [...new Set(categoriasResponse.map(item => item.category))] 
        .map(categoria => ({
            nombre: categoria 
        }));

    return {
        listaCategorias
    };
}

