import React, { useState, useEffect } from 'react';

function VehicleList() {

    const [vehicles, setVehicles] = useState([])

    const fetchVehicles = async () => {
        const url = 'http://localhost:8100/api/models/'
        const response = await fetch(url)
        if (response.ok) {
            const data = await response.json();
            setVehicles(data.models)
        }
    }

    useEffect(() => {
        fetchVehicles();
    }, []);

    return (
    <div className="service-form-container">
    <div className="people-page-background">
        <img
            className="people-page-image"
            src="https://wallpaperaccess.com/full/878797.jpg"
            alt="sale image"
            />
    </div>
            <h2>Vehicle Models</h2>
            <div className="row">
      {vehicles?.map(model => (
        <div className="col-md-4" key={model.id}>
          <div className="card">
            <img className="card-img-top" src={model.picture_url} alt="vehicle model" />
            <div className="card-body">
              <h5 className="card-title">{model.name}</h5>
              <p className="card-text">Manufacturer: {model.manufacturer.name}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
        </div>
    )

}

export default VehicleList;
