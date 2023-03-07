import React from "react";
import { useState } from "react";

function CustomerForm() {
  const initialData = {
    name: "",
    address: "",
    phone_number: "",
  };

  const [customerData, setCustomerData] = useState(initialData);

  const handleFormChange = (event) => {
    setCustomerData({
      ...customerData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const customerUrl = "http://localhost:8090/api/customers/";
    const fetchConfig = {
      method: "POST",
      body: JSON.stringify({ ...customerData }),
      headers: { "Content-Type": "application.json" },
    };
    const response = await fetch(customerUrl, fetchConfig);
    if (response.ok) {
      const newCustomer = await response.json();
      setCustomerData(initialData);
      alert(`You just created customer: ${newCustomer.name}!`);
    } else {
      alert("Something went wrong creating customer!");
    }
  };

  return (
    <div className="tech-form-container">
      <div className="people-page-background">
        <img
          className="people-page-image"
          src="https://tesla-cdn.thron.com/delivery/public/image/tesla/45992f1c-a33a-4a04-b1f0-338aff182f8e/bvlatuR/std/2880x1800/_25-Hero-D"
          alt="tech image"
        />
      </div>
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Register a Customer</h1>
          <form onSubmit={handleSubmit} id="customer-form">
            <div className="form-floating mb-3">
              <input
                onChange={handleFormChange}
                value={customerData.name}
                placeholder="Enter your full name"
                required
                type="text"
                name="name"
                id="name"
                className="form-control"
              />
              <label htmlFor="name">Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleFormChange}
                value={customerData.address}
                placeholder="Enter your address"
                required
                type="text"
                name="address"
                id="address"
                className="form-control"
              />
              <label htmlFor="address">Address</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleFormChange}
                value={customerData.phone_number}
                placeholder="Enter your phone number"
                required
                type="text"
                name="phone_number"
                id="phone_number"
                className="form-control"
              />
              <label htmlFor="city">Phone</label>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CustomerForm;
