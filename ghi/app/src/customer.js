import React from 'react';

class CustomerForm extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            customer: [],
            name: "",
            address: "",
            phone_number: "",
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleAddressChange = this.handleAddressChange.bind(this);
        this.handlePhonenumberChange = this.handlePhonenumberChange.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state};
        delete data.customer;
        console.log(data);

        const customerUrl = "http://localhost:8090/api/customers/"
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(customerUrl, fetchConfig);
        if (response.ok) {
            const newCustomer = await response.json();
            console.log(newCustomer);

            const cleared = {
                name: '',
                address: '',
                phone_number: '',
            };
            this.setState({success: true})
            this.setState(cleared);
        }
    }
    handleNameChange(event) {
        const value = event.target.value;
        this.setState({name: value});
    }

    handleAddressChange(event) {
        const value = event.target.value;
        this.setState({address: value});
    }
    handlePhonenumberChange(event) {
        const value = event.target.value;
        this.setState({phone_number: value});
    }

    async componentDidMount() {
        const url = "http://localhost:8090/api/customers/"

        const response = await fetch(url);

        if(response.ok) {
            const data = await response.json();
            console.log(data)
            this.setState({customer: data.customer});
        }
    }
    render() {
        let notSubmittedClass = "not-submitted";
        let successClass = "alert alert-success d-none mb-0";

        if (this.state.success === true) {
            notSubmittedClass = "not-submitted d-none";
            successClass = "alert alert-success mb-0";
        }
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Add Customer</h1>
                        <form onSubmit={this.handleSubmit} id="create-customer-form">
                            <div className="form-floating mb-3">
                                <input value={this.state.name} onChange={this.handleNameChange} placeholder="Name"  required type="text" name="name" id="name" className="form-control"/>
                                <label htmlFor="name">Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input value={this.state.address} onChange={this.handleAddressChange} placeholder="Address" required type="text" name="address" id="address" className="form-control"/>
                                <label htmlFor="address">Address</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input value={this.state.phone_number} onChange={this.handlePhonenumberChange} placeholder="Phone_Number" required type="phone_number" name="phone_number" id="phone_number" className="form-control"/>
                                <label htmlFor="phone_number">Phone Number</label>
                            </div>
                            <button className="btn btn-primary">Add!</button>
                        </form>
                        <div className={successClass} id="success-message">
                        Successfully added!
                    </div>
                </div>
            </div>
            </div>
        )
    }
}
export default CustomerForm;