import {useEffect, useState} from 'react';

const AppointmentForm = () => {
    //set state for form fields
  const [ formData, setFormData ] = useState({
    vin: '',
    customer_name: '',
    date: '',
    technician: [],
    reason: ''
  })

  // set state for technicians drop-down
  const [ technicians, setTechnicians ] = useState([])


  //useEffect() get data for locations drop-down
  useEffect(()=> {
    const loadData = async () => {
      const url = 'http://localhost:8080/api/technicians/';
      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        setTechnicians(data.technicians);
      } else {
        console.log("Error");
      }
    }

    loadData()
  }, [])

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  // after clicking 'submit', send data to API
  const handleSubmit = async (e) => {
    e.preventDefault();

    const appointmentUrl = 'http://localhost:8080/api/appointments/';
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(appointmentUrl, fetchConfig);
    if (response.ok) {
      const newAppointment = await response.json();
      console.log(newAppointment);
      // after submit, clear form
      setFormData({
        vin: '',
        customer_name: '',
        date: '',
        technician: '',
        reason: ''
      });
    }
  }

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create a new appointment</h1>
          <form onSubmit={handleSubmit} id="create-appointment-form">

            <div className="form-floating mb-3">
              <input onChange={handleFormChange} value={formData.vin} placeholder="VIN" required type="text" name="vin" id="vin" className="form-control" />
              <label htmlFor="vin">VIN</label>
            </div>

            <div className="form-floating mb-3">
              <input onChange={handleFormChange} value={formData.customer_name} placeholder="Customer name" required type="text" name="customer_name" id="customer_name" className="form-control" />
              <label htmlFor="customer_name">Customer name</label>
            </div>

            <div className="form-floating mb-3">
              <input onChange={handleFormChange} value={formData.date} placeholder="Date" required type="datetime-local" name="date" id="date" className="form-control" />
              <label htmlFor="date">Date</label>
            </div>

            <div className="form-floating mb-3">
              <input onChange={handleFormChange} value={formData.reason} placeholder="Reason" required type="text" name="reason" id="reason" className="form-control" />
              <label htmlFor="reason">Reason</label>
            </div>

            <div className="mb-3">
              <select onChange={handleFormChange} value={formData.technician} required name="technician" id="technician" className="form-select">
                <option value="">Choose a Technician</option>
                {technicians.map(technician => {
                  return (
                    <option key={technician.id} value={technician.id}>
                    {technician.technician_name}
                    </option>
                  );
                })}
              </select>
            </div>

            <button className="btn btn-dark">Create</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AppointmentForm;
