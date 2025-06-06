
const MenuItemCard = ({
  producto,
  onEdit,
  onDelete,
  deleting,
}) => (
  <div
    className={`menu-item-card`}
  >
    <img src={producto.imageUrl} alt={producto.name} className="menu-item-img" />
    <div className="menu-item-info">
      <h5 className="menu-item-name">{producto.name}</h5>
      <p className="menu-item-price">{producto.price.toFixed(2)} €</p>
      <p className="menu-item-category">{producto.category}</p>
      <div className="d-flex justify-content-center gap-2 mt-2">
        <button
          className="btn btn-info btn-sm"
          onClick={onEdit}
        >
          Editar
        </button>
        <button
          className="btn btn-danger btn-sm"
          onClick={onDelete}
          disabled={deleting}
        >
          {deleting ? "Eliminando..." : "Eliminar"}
        </button>
      </div>
    </div>
  </div>
);

export default MenuItemCard;