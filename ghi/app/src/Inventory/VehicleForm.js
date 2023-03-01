import React, { useState, useEffect } from 'react';

function VehicleForm() {

  const initialData = {
    name: "",
    picture_url: "",
    manufacturer_id: "",
  }

  const [modelData, setModelData] = useState(initialData);
  const [manufacturers, setManufacturers] = useState([]);

  const getManufacturers = async () => {
    const manufacturerUrl = 'http://localhost:8100/api/manufacturers/';
    const response = await fetch(manufacturerUrl);
    if (response.ok) {
      const manufacturerData = await response.json();
      setManufacturers(manufacturerData.manufacturers);
    }
  }

  useEffect(() => {
    getManufacturers();
  }, [])

  const handleFormChange = (e) => {
    setModelData({
      ...modelData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const modelUrl = 'http://localhost:8100/api/models/';
    const fetchConfig = {
      method: "POST",
      body: JSON.stringify({ ...modelData }),
      headers: { "Content-Type": "application/json" },
    }
    const response = await fetch(modelUrl, fetchConfig);
    if (response.ok) {
      const newModel = await response.json()
      setModelData(initialData);
      alert('Model created successfully!');
    }

  }
  return (
    <div className="service-form-container">
    <div className="people-page-background">
        <img
            className="people-page-image"
            src="https://wallpaperaccess.com/full/878797.jpg"
            alt="sale image"
            />
    </div>
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create a new vehicle model</h1>
          <form onSubmit={handleSubmit} id="create-appointment-form">

            <div className="form-floating mb-3">
              <input onChange={handleFormChange} value={modelData.name} placeholder="name" required type="text" name="name" id="name" className="form-control" />
              <label htmlFor="name">Name</label>
            </div>

            <div className="form-floating mb-3">
              <input onChange={handleFormChange} value={modelData.picture_url} placeholder="picture url" required type="url" name="picture_url" id="picture_url" className="form-control" />
              <label htmlFor="picture_url">Picture URL</label>
            </div>

            <div className="mb-3">
              <select onChange={handleFormChange} value={modelData.manufacturer_id} required name="manufacturer_id" id="manufacturer_id" className="form-select">
                <option value="">Choose a manufacturer</option>
                {manufacturers.map(manufacturer => {
                  return (
                    <option key={manufacturer.id} value={manufacturer.id}>
                      {manufacturer.name}
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


export default VehicleForm;
