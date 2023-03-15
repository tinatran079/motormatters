import { NavLink } from 'react-router-dom';

function Nav() {
  return (
<nav className="navbar navbar-expand-lg p-2 text-dark bg-opacity-25">
  <div className="container-fluid">
    <NavLink className="navbar-brand text-dark" to="/">MotorMatters</NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavDropdown">
      <ul className="navbar-nav">
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle text-dark" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Sales
          </a>
          <ul className="dropdown-menu">
            <li><NavLink className="dropdown-item" to="/sales">All Sales</NavLink></li>
            <li><NavLink className="dropdown-item" to="/sales/new">Register a Sale</NavLink></li>
          </ul>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle text-dark" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Service
          </a>
          <ul className="dropdown-menu">
            <li><NavLink className="dropdown-item" to="/appointments">All Service Appointments</NavLink></li>
            <li><NavLink className="dropdown-item" to="/appointments/new">Schedule a Service Appointment</NavLink></li>
            <li><NavLink className="dropdown-item" to="/appointments/history">Service History</NavLink></li>
          </ul>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle text-dark" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Inventory
          </a>
          <ul className="dropdown-menu">
            <li><NavLink className="dropdown-item" to="/manufacturers">Manufacturers</NavLink></li>
            <li><NavLink className="dropdown-item" to="/vehicles">Models</NavLink></li>
            <li><NavLink className="dropdown-item" to="/automobiles">Current Inventory</NavLink></li>
            <li><NavLink className="dropdown-item" to="/automobiles/new">Create New Automobile</NavLink></li>
            <li><NavLink className="dropdown-item" to="/vehicles/new">Create New Model</NavLink></li>
            <li><NavLink className="dropdown-item" to="/manufacturers/new">Create New Manufacturer</NavLink></li>
          </ul>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle text-dark" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            People
          </a>
          <ul className="dropdown-menu">
            <li><NavLink className="dropdown-item" to="/salesperson">Sales Staff</NavLink></li>
            <li><NavLink className="dropdown-item" to="/technicians">Technicians</NavLink></li>
            <li><NavLink className="dropdown-item" to="/customers">Customers</NavLink></li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</nav>
  )
}

export default Nav;
