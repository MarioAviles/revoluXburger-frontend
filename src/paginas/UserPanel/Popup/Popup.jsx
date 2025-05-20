const Popup = ({ popup }) =>
  popup ? (
    <div className="custom-popup">
      {popup}
    </div>
  ) : null;

export default Popup;