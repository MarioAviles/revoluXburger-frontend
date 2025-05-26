import React from "react";

const PopUpCarrito = ({ mensaje, onCancel, onConfirm }) => (
  <div className="popup-eliminar-overlay">
    <div className="popup-eliminar">
      <p>{mensaje}</p>
      <div className="d-flex justify-content-center gap-2">
        <button className="btn btn-secondary" onClick={onCancel}>Volver</button>
        <button className="btn btn-success" onClick={onConfirm}>Finalizar Compra</button>
      </div>
    </div>
  </div>
);

export default PopUpCarrito;