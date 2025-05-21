import React from "react";

const PopupConfirmacion = ({ mensaje, onCancel, onConfirm }) => (
  <div className="popup-eliminar-overlay">
    <div className="popup-eliminar">
      <p>{mensaje}</p>
      <div className="d-flex justify-content-center gap-2">
        <button className="btn btn-secondary" onClick={onCancel}>Cancelar</button>
        <button className="btn btn-danger" onClick={onConfirm}>Eliminar</button>
      </div>
    </div>
  </div>
);

export default PopupConfirmacion;