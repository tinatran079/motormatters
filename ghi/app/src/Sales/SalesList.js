import React, {useState, useEffect} from 'react';

function SalesList() {
  const [salesData, setSalesData] = useState([]);
  const [salesPersons, setSalesPersons] = useState([]);


  const getSalesPersons = async () => {
      const salesPersonsUrl = "http://localhost:8090/api/salespersons/";
      const response = await fetch(salesPersonsUrl);
      if (response.ok) {
          const data = await response.json();
          setSalesPersons(data.sales_persons);
      } else {
          alert("Something went wrong retrieving sales persons!");
      }
  }

  const getSales = async () => {
      const salesUrl = "http://localhost:8090/api/sales/";
      const response = await fetch(salesUrl);
      if (response.ok) {
          const data = await response.json();
          setSalesData(data.sales);
          return data.sales;
      } else {
          alert("Something went wrong retrieving sales records!");
      }
  }

  const handleChange = async (event) => {
      const sales = await getSales();
      setSalesData(sales)
      const filteredList = sales.filter(sale => sale.sales_person.id == event.target.value);
      setSalesData(filteredList);
  }


  useEffect(() => {
      getSalesPersons();
      getSales();
  }, []);


  return (
    <div>
            <br/>
            <h1>Sales History</h1>
            <div className="mb-3">
                <select onChange={handleChange} required id="sales_person" name="sales_person" className="form-select">
                  <option value="">Select a team member</option>
                  {salesPersons?.map(salesPerson => {
                    return(
                        <option key={salesPerson.id} value={salesPerson.id}>
                            {salesPerson.name}
                        </option>
                    )
                  })}
                </select>
                <p></p>
                <button onClick={getSales} className="btn btn-primary">See all</button>
            <br/>
            <br/>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Team Member Name</th>
                        <th>Customer</th>
                        <th>VIN</th>
                        <th>Sale Price</th>
                    </tr>
                </thead>
                <tbody>
                {salesData?.map(sale => {
                    return (
                    <tr key={sale.id}>
                        <td>{ sale.sales_person.name }</td>
                        <td>{ sale.customer.name }</td>
                        <td>{ sale.automobile.vin }</td>
                        <td>{ sale.price }</td>
                    </tr>
                    );
                })}
                </tbody>
            </table>
            </div>
        </div>

  );
}

export default SalesList;
