import React from 'react'


class SalesPersonForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            salesperson: [],
            name: "",
            employee_id: "",
        };
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmployeeChange = this.handleEmployeeChange.bind(this);
    }

    async handleSubmit(event){
        event.preventDefault();
        const data = {...this.state};
        delete data.salesperson;
        console.log(data);

        const salespersonUrl = 'http://localhost:8090/api/salepersons/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        };
        const response = await fetch(salespersonUrl, fetchConfig);
        if (response.ok) {
            const newSalesperson = await response.json();
            console.log(newSalesperson);

            const cleared = {
                name: '',
                employee_id: '',
            };
            this.setState({success: true})
            this.setState(cleared);
        }
    }
    handleNameChange(event) {
        const value = event.target.value;
        this.setState({name: value});
    }
    handleEmployeeChange(event){
        const value = event.target.value;
        this.setState({employee_id: value});
    }

    async componentDidMount() {
        const url = "http://localhost:8090/api/salepersons/";

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            console.log(data);
            this.setState({salesperson: data.salesperson});
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
                    <h1>Add a SalesAssociate</h1>
                    <form onSubmit={this.handleSubmit} id="create-sales-person-form">
                        <div className="form-floating mb-3">
                            <input value={this.state.name} onChange={this.handleNameChange} required placeholder="Name"  type="text" name="name" className="form-control"/>
                            <label htmlFor="name">Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={this.state.employee_id} onChange={this.handleEmployeeChange}  required placeholder="Employee_id" id="employee_id" type="text" name="employee_id" className="form-control"/>
                            <label htmlFor="employee_id">Employee Number Here</label>
                        </div>
                        <button type="submit" className="btn btn-primary">Add!</button>
                    </form>
                    <div className={successClass} id="success-message">
                        Successfully added!
                    </div>
                </div>
            </div>
        );
    }
}
export default SalesPersonForm;