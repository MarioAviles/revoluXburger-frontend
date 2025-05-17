import './AdminPanel.css';
import MenuItemsSection from './MenuItems/MenuItemsSection';
import ReservationsSection from './Reservations/ReservationSection';
import UsersSection from './Users/UsersSection';
import UploadImages from './UploadImages/UploadImages';

const AdminPanel = () => {
  return (
    <div className="admin-panel container py-5">
      <h2 className="mb-4 text-center">Panel de Administración</h2>
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
        <div className="col-md-12">
          <UploadImages />
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;