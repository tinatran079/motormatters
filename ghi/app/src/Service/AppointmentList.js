import { useEffect, useState } from 'react'

function AppointmentList() {

  const [appointments, setAppointments] = useState([])

  const [automobileVOs, setAutomobileVOs] = useState([])

  const fetchAppointments = async () => {
    const url = 'http://localhost:8080/api/appointments/';
    const response = await fetch(url)
    const data = await response.json()
    setAppointments(data.appointments)
  }


  const fetchAutomobileVOs = async () => {
    const url = 'http://localhost:8080/api/automobilesvo/';
    const response = await fetch(url)
    const automobiles = await response.json()
    setAutomobileVOs(automobiles.auto)
  }

  const handleCancel = async (id) => {
    const deleteUrl = `http://localhost:8080/api/appointments/${id}/`;
    const response = await fetch(deleteUrl, { method: 'DELETE' });
  }


  const handleFinish = async (id) => {
    const finishUrl = `http://localhost:8080/api/appointments/${id}/`;
    const status = { "status": true }
    const fetchConfig = {
      method: "PUT",
      body: JSON.stringify(status),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(finishUrl, fetchConfig)
  }


  const conditionalVip = (vin) => {
    if (automobileVOs.find((obj) => obj.vin === vin)) {
      return {
        backgroundColor: "#CCCCFF",
      }
    }
  }


  useEffect(() => {
    fetchAppointments();
    fetchAutomobileVOs();
  }, []);


  return (
    <div>
      <h3>Current Appointments</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Date & Time</th>
            <th>Reason</th>
            <th>Technician</th>
            <th>VIN</th>
            <th>Cancel</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {appointments?.filter((appointment) => appointment.status !== true)
            ?.map(appointment => {
              return (
                <tr key={appointment.id} style={conditionalVip(appointment.vin)}>
                  <td>{appointment.customer_name} </td>
                  <td>{new Date(appointment.date).toUTCString()}</td>
                  <td>{appointment.reason}</td>
                  <td>{appointment.technician.technician_name}</td>
                  <td>{appointment.vin}</td>
                  <td><button onClick={() => handleCancel(appointment.id)}
                    className="btn btn-danger">Cancel</button></td>
                  <td><button onClick={() => handleFinish(appointment.id)}
                    className="btn btn-success" name="status">Finished</button></td>

                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  )
}

export default AppointmentList;
