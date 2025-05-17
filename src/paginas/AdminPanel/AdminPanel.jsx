import './AdminPanel.css';
import MenuItemsSection from './MenuItems/MenuItemsSection';
import ReservationsSection from './Reservations/ReservationSection';
import UsersSection from './Users/UsersSection';
import UploadImages from './UploadImages/UploadImages';

const AdminPanel = () => {
  return (
    <div className="admin-panel container-fluid py-5 px-3"> 
      <h1 className="mb-4 text-center">Bienvenido al Panel de Administración</h1>
      <div className="row">
        <div className="col-md-4">
          <MenuItemsSection />
        </div>
        <div className="col-md-4">
          <ReservationsSection />
        </div>
        <div className="col-md-4">
          <UsersSection />
        </div>
        <div className="col-12">
          <UploadImages />
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;