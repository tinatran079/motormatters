import React from "react";

class SalesList extends React.Component {
  state = {
    sale: [],
  };

  async componentDidMount() {
    const url = "http://localhost:8090/api/sales/";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      this.setState({
        sale: data.sale?.map((sales) => ({
            price: sales.price,
            vin: sales.vin.vin,
            customer: sales.customer.name,
            sales_associate: sales.sales_person.name,
            employee_id: sales.sales_person.employee_id,
        })) });
    }
  }

  render() {
    return (
      <div>
        <h1>List Of Sales</h1>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Sales Associate</th>
              <th>Employee ID</th>
              <th>Purchaser</th>
              <th>VIN</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {this.state.sale.map((sales) => {
              return (
                <tr key={sales.href}>
                  <td>{sales.sales_associate}</td>
                  <td>{sales.employee_id}</td>
                  <td>{sales.customer}</td>
                  <td>{sales.vin}</td>
                  <td>{sales.price}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default SalesList;