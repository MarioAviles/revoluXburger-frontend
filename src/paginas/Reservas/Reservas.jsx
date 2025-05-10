import './Reservas.css';

const Reservas = () => {   
    return (
        <div className="container-reservas container-fluid mt-5">
            <h1>Reservar Mesa</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">Nombre</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="nombre" 
                        placeholder="Introduce tu nombre" 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="fechaHora" className="form-label">Fecha y Hora</label>
                    <input 
                        type="datetime-local" 
                        className="form-control" 
                        id="fechaHora" 
                    />
                </div>
                <button type="submit" className="btn btn-custom">Reservar</button>
            </form>
        </div>
    );
};

export default Reservas;