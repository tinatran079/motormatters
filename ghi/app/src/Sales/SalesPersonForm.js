import React, { useState } from 'react';

function SalesPersonForm() {

    const noData = {
        name: "",
        employee_id: "",
    }

    const [salesPersonData, setSalesPersonData] = useState(noData);

    const handleChange = (event) => {
        setSalesPersonData({...salesPersonData, [event.target.name]: event.target.value});
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const salesPersonUrl = "http://localhost:8090/api/salespersons/";
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify({...salesPersonData}),
            headers: {"Content-Type": "application/json"},
        }
        const response = await fetch(salesPersonUrl, fetchConfig);
        if (response.ok) {
            const newSalesPerson = await response.json();
            setSalesPersonData(noData);
            alert(`Welcome ${newSalesPerson.name}!`);
        } else {
            alert("Something went wrong!");
        }
    }


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
            <h1>Register a Sales Person</h1>
                <form onSubmit={handleSubmit} id="employee-form">
                    <div className="form-floating mb-3">
                        <input onChange={handleChange} value={salesPersonData.name} placeholder="name" required type="text" name="name" id="name" className="form-control" />
                        <label htmlFor="name">Name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={handleChange} value={salesPersonData.employee_id} placeholder="employee_id" required type="text" name="employee_id" id="employee_id" className="form-control" />
                        <label htmlFor="employee_id">Employee ID</label>
                    </div>
                    <button className="btn btn-primary">Create</button>
                </form>
            </div>
            </div>
        </div>

    );
}

export default SalesPersonForm;
