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
        <div>
            <h2>List of Vehicle Models</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Manufacturer</th>
                        <th>Picture</th>
                    </tr>
                </thead>
                <tbody>
                    {vehicles?.map(model => {
                        return (
                            <tr key={model.id}>
                                <td>{model.name}</td>
                                <td>{model.manufacturer.name}</td>
                                <td><img src={model.picture_url} className="rounded float-left" width="200" height="100" alt="img"></img></td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )

}

export default VehicleList;
