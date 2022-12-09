import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">CarCar</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav_item">
              <NavLink className="nav-link" aria-current="page" to="/appointments">Appointments</NavLink>
            </li>
          <li className="nav_item">
              <NavLink className="nav-link" aria-current="page" to="/technicians">Create Technician</NavLink>
          </li>
          <li className="nav_item">
              <NavLink className="nav-link" aria-current="page" to="/appointments/new">Create Appointment</NavLink>
          </li>
          <li className="nav_item">
              <NavLink className="nav-link" aria-current="page" to="/appointments/history">Service History</NavLink>
          </li>
          <li className="nav_item">
              <NavLink className="nav-link" aria-current="page" to="/manufacturers">Manufacturers</NavLink>
          </li>
          <li className="nav_item">
              <NavLink className="nav-link" aria-current="page" to="/manufacturers/new">Create Manufacturer</NavLink>
          </li>
          <li className="nav_item">
              <NavLink className="nav-link" aria-current="page" to="/vehicles">Models</NavLink>
          </li>
          <li className="nav_item">
              <NavLink className="nav-link" aria-current="page" to="/vehicles/new">Create Model</NavLink>
          </li>
          <li className="nav_item">
              <NavLink className="nav-link" aria-current="page" to="/automobiles">Automobiles</NavLink>
          </li>
          <li className="nav_item">
              <NavLink className="nav-link" aria-current="page" to="/automobiles/new">Create Automobile</NavLink>
          </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav;
