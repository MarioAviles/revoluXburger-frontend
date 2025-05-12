import './Reservas.css';

const Reservas = () => {   
    return (
        <div className="container-reservas container text-center">
            <h1>Reservar Mesa</h1>
            <form className='text-center align-items-center justify-content-center flex-column'>
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
                    <label htmlFor="telefono" className="form-label">Telefono</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="telefono" 
                        placeholder="Introduce tu telefono" 
                    />
                </div>
                  <div className="mb-3">
                    <label htmlFor="descripcion" className="form-label">Descripción</label>
                    <textarea
                        className="form-control" 
                        id="descripcion" 
                        placeholder="Introduce una breve descripción de la reserva" 
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