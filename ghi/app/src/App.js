import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import AppointmentList from './Service/AppointmentList';
import TechnicianForm from './Service/TechnicianForm';
import AppointmentForm from './Service/AppointmentForm';
import ServiceHistory from './Service/ServiceHistory';
import ManufacturerList from './Inventory/ManufacturerList';
import ManufacturerForm from './Inventory/ManufacturerForm';
import VehicleList from './Inventory/VehicleList';
import VehicleForm from './Inventory/VehicleForm';
import AutomobileList from './Inventory/AutomobileList';
import AutomobileForm from './Inventory/AutomobileForm';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
      <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/technicians" element={<TechnicianForm />} />
          <Route path="automobiles">
            <Route index element={<AutomobileList />} />
            <Route path="new" element={<AutomobileForm />} />
            </Route>
          <Route path="vehicles">
            <Route index element ={<VehicleList />} />
            <Route path="new" element={<VehicleForm />} />
          </Route>
          <Route path ="manufacturers">
            <Route index element={<ManufacturerList />} />
            <Route path="new" element={<ManufacturerForm />} />
          </Route>
          <Route path ="appointments">
            <Route index element={<AppointmentList />} />
            <Route path="new" element={<AppointmentForm />} />
            <Route path="history" element={<ServiceHistory />} />
            </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
