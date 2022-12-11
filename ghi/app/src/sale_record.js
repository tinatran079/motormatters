import React from 'react';

class SaleRecordForm extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            vin: '',
            salesperson: '',
            customer: '',
            price: '',
            vins: [],
            salespersons: [],
            customers: []
        };
        this.handleVinChange = this.handleVinChange.bind(this);
        this.handleSalesPersonChange = this.handleSalesPersonChange.bind(this);
        this.handleCustomerChange = this.handleCustomerChange.bind(this);
        this.handlePriceChange = this.handlePriceChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    async componentDidMount() {
        const url1 = "http://localhost:8090/api/automobile/";
        const url2 = "http://localhost:8090/api/salepersons/";
        const url3 = "http://localhost:8090/api/customers/";

        try {
          const response1 = await fetch(url1);
          const response2 = await fetch(url2);
          const response3 = await fetch(url3);

          if (response1.ok && response2.ok && response3.ok) {
            const data1 = await response1.json();
            const data2 = await response2.json();
            const data3 = await response3.json();

            this.setState({
              vins: data1.map((automobile) => ({
                vin: automobile.vin
              })),
              salespersons: data2.salespersons,
              customers: data3.customers?.map((customer) => ({
                name: customer.name,
              }))
            });
          }
        } catch (error) {
          console.error(error);
        }
      }
    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state};
        console.log(data);

        const salerecordUrl = "http://localhost:8090/api/sales/";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers : {
                "Content-Type": 'application/json',
            },
        };
        const response = await fetch(salerecordUrl, fetchConfig);
        if (response.ok) {
            const newSalesRecord = await response.json()
            console.log(newSalesRecord)

            const cleared = {
                vin: '',
                salesperson: '',
                customer: '',
                price: '',
                vins: [],
                salespersons: [],
                customers: [],

            }
            this.setState(cleared);
        }

    }
    handleVinChange(event) {
        const value = event.target.value;
        this.setState({vin: value})
    }
    handleSalesPersonChange(event){
        const value = event.target.value;
        this.setState({salesperson: value})
    }
    handleCustomerChange(event){
        const value = event.target.value;
        this.setState({customer: value});

    }
    handlePriceChange(event){
        const value = event.target.value;
        this.setState({price: value});
    }
ß
    render(){
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Create Sales Record</h1>
                        <form onSubmit={this.handleSubmit} id="create-sales-form">
                            <div className="mb-3">
                            <select  value={this.state.vin} onChange={this.handleVinChange} required id="vin" name="vin" className="form-select">
                                    <option value=''>Choose an Automobile</option>
                                    {this.state.vins?.map(vin =>{
                                        return (
                                            <option key={vin.vin} value={vin.vin}>
                                                {vin.vin}
                                            </option>
                                        )
                                    })}
                                </select>
                            </div>
                                <div className="mb-3">
                                    <select value={this.state.salesperson} onChange={this.handleSalesPersonChange} required id="salesperson" name="salesperson" className="form-select">
                                        <option value=''>Choose A Sales Person</option>
                                        {this.state.salespersons?.map(salesperson =>{
                                            return (
                                                <option key={salesperson.href} value={salesperson.href}>
                                                    {salesperson.name}
                                                </option>
                                            )
                                        })}
                                     </select>
                                </div>
                                <div className="mb-3">
                                    <select value={this.state.customer} onChange={this.handleCustomerChange}  id="customer" required name="customer" className="form-select">
                                        <option value=''>Choose a Customer</option>
                                        {this.state.customers?.map(customer =>{
                                            return (
                                                <option key={customer.href} value={customer.href}>
                                                    {customer.customerName}
                                                </option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <input onChange={this.handlePriceChange} required placeholder="Sale Price" type="price" id='price' name="price" className="form-control"/>

                                 </div>

                            <button className="btn btn=primary">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default SaleRecordForm;
