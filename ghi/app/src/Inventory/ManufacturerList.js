import React, { useState, useEffect } from 'react';


function ManufacturerList(){

    const [manufacturers, setManufacturers] = useState([]);

    const getchManufacturers = async () => {
        const url = 'http://localhost:8100/api/manufacturers/';
        const response = await fetch(url);
        if (response.ok){
            const data = await response.json();
            setManufacturers(data.manufacturers)
        }
    }

    useEffect(() => {
        getchManufacturers()
    },[]);

    return(
        <table className="table table-striped">
            <thead>
                <th>Name</th>
            </thead>
            <tbody>
                {manufacturers.map(manufacturer => {
                    return (
                        <tr key={manufacturer.id} >
                            <td>{manufacturer.name}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default ManufacturerList
