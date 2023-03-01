import React, { useState, useEffect } from 'react';

function SaleForm() {

    const initialData = {
        "automobile": "",
        "sales_person": "",
        "customer": "",
        "price": "",
    }

    const [saleData, setSaleData] = useState(initialData);
    const [automobiles, setAutomobiles] = useState([]);
    const [salesPersons, setSalesPersons] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [newSale, setNewSale] = useState("")


    const getAutomobiles = async () => {
        const automobileUrl = "http://localhost:8100/api/automobiles/";
        const response = await fetch(automobileUrl);
        if (response.ok) {
            const autoData = await response.json();
            setAutomobiles(autoData.autos);
        } else {
            alert("Something went wrong retrieving automobiles!");
        }
    }


    const getSalesPersons = async () => {
        const salesPersonsUrl = "http://localhost:8090/api/salespersons/";
        const response = await fetch(salesPersonsUrl);
        if (response.ok) {
            const salesPersonsData = await response.json();
            setSalesPersons(salesPersonsData.sales_persons);
        } else {
            alert("Something went wrong retrieving sales persons!")
        }
    }

    const getCustomers = async () => {
        const customersUrl = "http://localhost:8090/api/customers/";
        const response = await fetch(customersUrl);
        if (response.ok) {
            const customersData = await response.json();
            setCustomers(customersData.customers);
        } else {
            alert("Something went wrong retrieving customers!")
        }
    }

    useEffect(() => {
        getAutomobiles();
        getSalesPersons();
        getCustomers();
    }, []);


    const handleChange = (event) => {
        setSaleData({...saleData, [event.target.name]: event.target.value});
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const salesUrl = "http://localhost:8090/api/sales/";
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify({...saleData}),
            headers: {"Content-Type": "application/json"},
        }
        const response = await fetch(salesUrl, fetchConfig);
        if (response.ok) {
            const newSaleInfo = await response.json();
            setSaleData(initialData);
            setNewSale(newSaleInfo);
            alert(`Congrats on the sale, ${newSaleInfo.sales_person.name}!`)
        } else {
            alert("Something went wrong finalizing sale!");
        }
        const autoUrl = `http://localhost:8100/api/automobiles/${saleData.automobile}/`
        const autoResponse = await fetch(autoUrl, {method: "DELETE"})
        if (!autoResponse.ok) {
            alert("Something went wrong removing automobile from inventory!");
        }

        getAutomobiles();
    }


    return (
    <div className="tech-form-container">
      <div className="people-page-background">
          <img
              className="people-page-image"
              src="https://wallpapercave.com/wp/wp4004363.jpg"
              alt="sale image"
              />
      </div>
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Record a new sale</h1>
            <form onSubmit={handleSubmit} id="sale-form">
            <div className="mb-3">
                <select onChange={handleChange} value={saleData.automobile} required id="automobile" name="automobile" className="form-select">
                  <option value="">Select an automobile</option>
                  {automobiles?.map(automobile => {
                    return(
                        <option key={automobile.id} value={automobile.vin}>
                            {automobile.vin}
                        </option>
                    )
                  })}
                </select>
            </div>
            <div className="mb-3">
                <select onChange={handleChange} value={saleData.sales_person} required id="sales_person" name="sales_person" className="form-select">
                  <option value="">Select a team member</option>
                  {salesPersons?.map(salesPerson => {
                    return(
                        <option key={salesPerson.id} value={salesPerson.employee_id}>
                            {salesPerson.name}
                        </option>
                    )
                  })}
                </select>
            </div>
            <div className="mb-3">
                <select onChange={handleChange} value={saleData.customer} required id="customer" name="customer" className="form-select">
                  <option value="">Select a customer</option>
                  {customers?.map(customer => {
                    return(
                        <option key={customer.id} value={customer.id}>
                            {customer.name}
                        </option>
                    )
                  })}
                </select>
            </div>
            <div className="form-floating mb-3">
                <input onChange={handleChange} value={saleData.price} placeholder="price" required type="text" name="price" id="price" className="form-control" />
                <label htmlFor="city">Price</label>
            </div>
              <button className="btn btn-primary">Sell</button>
            </form>
          </div>
        </div>
        </div>

    );
}

export default SaleForm;
