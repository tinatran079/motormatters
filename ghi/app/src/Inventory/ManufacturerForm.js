import { useState } from "react";

const ManufacturerForm = () => {
  const [formData, setFormData] = useState({
    name: "",
  });

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = `http://localhost:8100/api/manufacturers/`;
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      const newManufacturer = await response.json();

      setFormData({
        name: "",
      });
    }
  };

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
          <h1>Create a new manufacturer</h1>
          <form onSubmit={handleSubmit} id="create-manufacturer-form">
            <div className="form-floating mb-3">
              <input
                onChange={handleFormChange}
                value={formData.name}
                name="name"
                placeholder="Manufacturer name"
                required
                type="text"
                id="name"
                className="form-control"
              />
              <label htmlFor="name">Manufacturer name</label>
            </div>

            <button className="btn btn-dark">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ManufacturerForm;
