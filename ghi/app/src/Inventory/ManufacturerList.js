import React, { useState, useEffect } from "react";

function ManufacturerList() {
  const [manufacturers, setManufacturers] = useState([]);

  const fetchManufacturers = async () => {
    const url = "http://localhost:8100/api/manufacturers/";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setManufacturers(data.manufacturers);
    }
  };

  useEffect(() => {
    fetchManufacturers();
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
      <h2>List of Manufacturers</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {manufacturers.map((manufacturer) => {
            return (
              <tr key={manufacturer.id}>
                <td>{manufacturer.name}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ManufacturerList;
