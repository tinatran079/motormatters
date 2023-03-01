import React, { useState } from 'react';

function TechnicianForm() {
    const [technician_name, setName] = useState('');

    const [employee_number, setEmployeeNumber] = useState('');

    const handleNameChange = e => {
        setName(e.target.value);
    };
    const handleEmployeeNumberChange = e => {
        setEmployeeNumber(e.target.value);
    };

    async function handleSubmit(e) {
        e.preventDefault();
        const technician = {
            technician_name,
            employee_number,
        }
        const techUrl = `http://localhost:8080/api/technicians/`;
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(technician),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(techUrl, fetchConfig);
        if (response.ok) {
            const newTech = await response.json();
            alert("You just created a technician!");
            setName('')
            setEmployeeNumber('')
        };
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
                    <h1>Enter a Technician</h1>
                    <form onSubmit={handleSubmit} id="create-technician">
                        <div className="form-floating mb-3">
                            <input onChange={handleNameChange} value={technician_name} placeholder="Name" required type="text" name="technician_name" id="technician_name" className="form-control" />
                            <label htmlFor="technician_name">Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleEmployeeNumberChange} value={employee_number} placeholder="Employee number" required type="text" name="employee_number" id="employee_number" className="form-control" />
                            <label htmlFor="employee_number">Employee Number</label>
                        </div>
                        <br></br>
                        <button className="btn btn-dark">Create</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default TechnicianForm
