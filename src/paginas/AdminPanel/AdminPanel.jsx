import './AdminPanel.css';
import MenuItemsSection from './MenuItems/MenuItemsSection';
import ReservationsSection from './Reservations/ReservationSection';
import UsersSection from './Users/UsersSection';
import ImagesSection from './Images/ImagesSection'; 
import CategoriesSection from './Categories/CategoriesSection';
import TiposSection from './Tipos/TiposSection';

const AdminPanel = () => {
  return (
    <div className="admin-panel container-fluid py-5 px-3">
      <h1 className="mb-4 text-center">Bienvenido al Panel de Administración</h1>
      <div className="row">
        <div className="col-md-6">
          <MenuItemsSection />
        </div>
        <div className="col-md-6">
          <ReservationsSection />
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-6">
          <UsersSection />
        </div>
        <div className="col-md-6">
          <ImagesSection /> 
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-6">
          <CategoriesSection />
         </div>
         <div className="col-md-6">
          <TiposSection />
         </div>
      </div>

    </div>
  );
};

export default AdminPanel;