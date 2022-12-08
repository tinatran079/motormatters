import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import AppointmentList from './Service/AppointmentList';
import TechnicianForm from './Service/TechnicianForm';
import AppointmentForm from './Service/AppointmentForm';
import ServiceHistory from './Service/ServiceHistory';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
      <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/technician" element={<TechnicianForm />} />
          <Route path="/appointments/new" element={<AppointmentForm />} />
          <Route path="/appointments" element={<AppointmentList />} />
          <Route path="/appointments/history" element={<ServiceHistory />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
