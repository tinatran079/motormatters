import React from "react";

function SalesList(props) {
    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Sales Associate</th>
                    <th>Employee ID</th>
                    <th>Customer</th>
                    <th>VIN</th>
                    <th>Price of Sale</th>
                </tr>
            </thead>
            <tbody>
                {props.sales?.map(sale => {
                    return (
                        <tr key={sale.id}>
                            <td>{sale.sales_person}</td>
                            <td>{sale.customer}</td>
                            <td>{sale.vin}</td>
                            <td>{sale.price}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default SalesList;