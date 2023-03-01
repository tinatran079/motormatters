import { NavLink } from 'react-router-dom';
import Nav from './Nav';
function MainPage() {
  return (
    <div className="main-page-container">
      <div className="main-page-background">
        <img
          className="main-page-image"
          src="https://tesla-cdn.thron.com/delivery/public/image/tesla/a269d7b4-87a9-4057-9ac5-2565e56a188e/bvlatuR/std/4096x2560/Homepage-Model-3-Desktop-LHD?quality=auto-medium&amp;format=auto"
          alt="Car dealership"
        />
      </div>
      <div className="main-page-content">
        <h1 className="main-page-title fw-bold">Welcome to MotorMatters</h1>
        <p className="main-page-subtitle">
          The premiere solution for automobile dealership management!
        </p>
      </div>
      <div className="main-page-buttons">
      <NavLink to ="/automobiles">
        <button className="main-page-cta btn btn-lg btn-outline-light">
          Check our Inventory
        </button>
      </NavLink>
      <NavLink to = "/appointments">
        <button className="main-page-button btn btn-lg btn-outline-dark">
          Upcoming Appointments
        </button>
      </NavLink>
      </div>
    </div>
  );
}
export default MainPage;
