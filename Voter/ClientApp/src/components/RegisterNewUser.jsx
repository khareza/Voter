import React, { Component } from 'react';

export class RegisterNewUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
            firstName: '',
            lastName: '',
            email:'',
            isSubmitDisabled: true
        };
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let { userName, password, firstName, lastName, email } = this.state;

        this.props.register(
            { userName, password, firstName, lastName, email}
        );

        this.setState({
            userName: '',
            password: '',
            firstName: '',
            lastName: '',
            email: '',
            isSubmitDisabled: true});
    }

    handleInputChange = (event) => {
        let newObj = {};
        newObj[event.target.name] = event.target.value;

        this.setState(newObj);
        this.checkIfFormDataIsValid();
    }

    checkIfFormDataIsValid = () => {
        if (this.state.userName.length > 0 && this.state.password.length > 0) {
            this.setState({ isSubmitDisabled: false });
        }
        else {
            this.setState({ isSubmitDisabled: true });
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit} autoComplete="off">
                    <div className="form-row">
                        <div className="form-gorup col-md-8 offset-md-2">
                            <div className="form-group">
                                <label >User Name</label>
                                <input className="form-control" type="text" name="userName" value={this.state.userName} onChange={this.handleInputChange} required />
                            </div>

                            <div className="form-group">
                                <label>Password</label>
                                <input className="form-control" type="password" name="password" value={this.state.password} onChange={this.handleInputChange} required />
                            </div>

                            <div className="form-group">
                                <label>FirstName</label>
                                <input className="form-control" type="text" name="firstName" value={this.state.firstName} onChange={this.handleInputChange}/>
                            </div>

                            <div className="form-group">
                                <label>LastName</label>
                                <input className="form-control" type="text" name="lastName" value={this.state.lastName} onChange={this.handleInputChange}/>
                            </div>

                            <div className="form-group">
                                <label>Email</label>
                                <input className="form-control" type="text" name="email" value={this.state.email} onChange={this.handleInputChange}/>
                            </div>


                            <input type="submit" value="Add new resident" className="btn btn-large btn-block btn-primary" disabled={this.state.isSubmitDisabled} />
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
