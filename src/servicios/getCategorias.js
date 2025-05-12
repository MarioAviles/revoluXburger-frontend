export async function getCategorias() {

    const fetchCategorias = `https://revoluxburger-backend.onrender.com/menu`;

    const categoriasResponse = await fetch(fetchCategorias)
        .then(response => response.json());

    const listaCategorias = [...new Set(categoriasResponse.map(item => item.categoria))] // Extrae categorías únicas
        .map(categoria => ({
            nombre: categoria
        }));

    return {
        listaCategorias
    };
}

/* Esto es provisional para que el host pueda cargar la página, ya que las categorias 
no se van a coger desde ahí, pero es necesario para que el componente se renderize correctamente*/