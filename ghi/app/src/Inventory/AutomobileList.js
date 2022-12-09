import React, { useState, useEffect } from 'react';

function AutomobileList() {

    const [automobileList, setAutomobileList] = useState([]);

    const fetchAutos = async () => {
        const url = 'http://localhost:8100/api/automobiles/'
        const response = await fetch(url)
        if (response.ok) {
            const data = await response.json();
            console.log(data)
            setAutomobileList(data.autos);
        }
    }

    useEffect(() => {
        fetchAutos()
    }, []);

    return (
        <div>
            <h2>List of Automobiles</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Vin</th>
                        <th>Color</th>
                        <th>Year</th>
                        <th>Model</th>
                        <th>Manufacturer</th>
                    </tr>
                </thead>
                <tbody>
                    {automobileList?.map(auto => {
                        return (
                            <tr key={auto.href} value={auto.id}>
                                <td>{auto.vin}</td>
                                <td>{auto.color}</td>
                                <td>{auto.year}</td>
                                <td>{auto.model.name}</td>
                                <td>{auto.model.manufacturer.name}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default AutomobileList;
