import React from 'react';

class CustomerForm extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            customer: [],
            name: '',
            address: '',
            phone_number: '',
        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleAddressChange = this.handleAddressChange.bind(this);
        this.handlePhonenumChange = this.handlePhonenumChange.bind(this);
    }

    async handleSubmit(event) {
        event.preventDeafault();
        const data = {...this.state};
        delete data.customers;
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
    handlePhonenumChange(event) {
        const value = event.target.value;
        this.setState({phonenum: value});
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
                                <input value={this.state.phonenum} onChange={this.handlePhonenumChange} placeholder="Phone Number" required type="phone number" name="phonenum" id="phonenum" className="form-control"/>
                                <label htmlFor="phonenum">Phone Number</label>
                            </div>
                            <button className="btn btn-primary">Add!</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
export default CustomerForm;