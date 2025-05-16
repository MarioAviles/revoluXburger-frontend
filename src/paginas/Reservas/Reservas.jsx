import './Reservas.css';
import { useState } from 'react';
import useReserva from '../../hooks/useReserva';

const Reservas = () => {
  
  const [form, setForm] = useState({
    name: '',
    phone: '',
    description: '',
    date: '',
    time: ''
  });
  const { reservar, loading, error, success } = useReserva();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await reservar(form);
    setForm({ name: '', phone: '', description: '', date: '' });
  };

  return (
    <div className="container-reservas container">
      <h1>Reservar Mesa</h1>
      <form className='text-center align-items-center justify-content-center flex-column' onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            id="nombre"
            name="name"
            placeholder="Introduce tu nombre"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="telefono" className="form-label">Teléfono</label>
          <input
            type="text"
            className="form-control"
            id="telefono"
            name="phone"
            placeholder="Introduce tu teléfono"
            value={form.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="descripcion" className="form-label">Descripción</label>
          <textarea
            className="form-control"
            id="descripcion"
            name="description"
            placeholder="Introduce una breve descripción de la reserva"
            value={form.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="fechaHora" className="form-label">Fecha y Hora</label>
          <input
            type="datetime-local"
            className="form-control"
            id="fechaHora"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-custom" disabled={loading}>
          {loading ? "Reservando..." : "Reservar"}
        </button>
        {success && <div className="alert alert-success mt-3">¡Reserva realizada con éxito!</div>}
        {error && <div className="alert alert-danger mt-3">{error}</div>}
      </form>
    </div>
  );
};

export default Reservas;