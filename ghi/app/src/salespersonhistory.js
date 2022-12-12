import React, { useState, useEffect} from 'react';

function SalesPersonHistory() {
    const [sale, setHistory] = useState([]);

    useEffect(() => {
        const fetchHistory = async () => {
            const response = await fetch("http://localhost:8090/api/sales/");
            const data = await response.json();

            setHistory(
                data.sale.map((sales) => ({
                    sales_person: sales.sales_person.name,
                    customer: sales.customer.name,
                    vin: sales.vin,
                    price: sales.price,
                }))
            );
        };

        fetchHistory();
    }, []);


    const [fieldSelect, setFieldSelect] = useState('sales');
    const [filterSelect, setSelect] = useState('');



    const getFilteredList = () => {
        return sale.filter((sales) => sales[fieldSelect]?.includes(filterSelect));
    };

    const handleFieldChange = (e) => {
        setFieldSelect(e.target.value);
    };

    const handleSelectChange = (e) => {
        setSelect(e.target.value);
    };


    return (
        <div>
            <h1 className="mb-3">Sales person History</h1>
            <div className="form-putline">
                <select className="form-control" onChange={handleFieldChange} >
                    <option onChange={handleSelectChange} value='sales person'>Choose A Sales Person</option>
                    {sale.map((sales)=> {
                        return (
                            <option key={sales.href} value={sales.href}>
                                {sales.sales_person}
                            </option>
                        )
                    })}
                </select>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Sales Person</th>
                            <th>Customer</th>
                            <th>VIN</th>
                            <th>Sale Price</th>
                        </tr>
                    </thead>
                    <tbody>
                    {getFilteredList().map((sales) => {
                        <tr key={sales.sales_person}>
                            <td>{sales.sales_person}</td>
                            <td>{sales.customer}</td>
                            <td>{sales.vin}</td>
                            <td>{sales.price}</td>
                        </tr>
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default SalesPersonHistory;