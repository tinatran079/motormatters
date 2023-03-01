import React, { useState, useEffect } from 'react';

function ServiceHistory() {

  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    const url = 'http://localhost:8080/api/appointments/';
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setAppointments(data.appointments)
    }
  }

  const [filter, setFilter] = useState('')

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  }

  useEffect(() => {
    fetchAppointments()
  }, []);

  return (
    <div>
      <h3 className="mb-3">Service History</h3>
      <div className="form-outline">
        <input type="search" id="form1" className="form-control" placeholder="Search by VIN" onChange={handleFilterChange} aria-label="Search" />
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Date & Time</th>
            <th>Reason</th>
            <th>Technician</th>
            <th>VIN</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {appointments?.filter((appointment) =>
            appointment.vin.includes(filter)
          ).map(appointment => {
            return (
              <tr key={appointment.id} >
                <td>{appointment.customer_name} </td>
                <td>{new Date(appointment.date).toUTCString()}</td>
                <td>{appointment.reason}</td>
                <td>{appointment.technician.technician_name}</td>
                <td>{appointment.vin}</td>
                <td>{appointment.status}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default ServiceHistory
