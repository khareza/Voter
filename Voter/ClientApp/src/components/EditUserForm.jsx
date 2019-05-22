import React, { Component } from 'react';
import AuthMethods from '../Helpers/AuthMethods';
import { withRouter } from 'react-router-dom';

class EditUserForm extends Component {
    constructor(props) {
        super(props);
        this.Auth = new AuthMethods();

        this.state = {
            userName: this.props.userToEdit.userName,
            firstName: this.props.userToEdit.firstName,
            lastName: this.props.userToEdit.lastName,
            address: this.props.userToEdit.address ? this.props.userToEdit.address : '',
            email: this.props.userToEdit.email,
            phoneNumber: this.props.userToEdit.phoneNumber ? this.props.userToEdit.phoneNumber : '',
            isSubmitDisabled: true
        };
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let { userName, firstName, lastName, address, email, phoneNumber } = this.state;

        this.Auth.editUser(
            { id: this.props.userToEdit.id, userName, firstName, lastName, address, email, phoneNumber }
        ).then((res) => { this.props.history.push('/residents')});
    }

    handleInputChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
        this.checkIfFormDataIsValid();
    }

    checkIfFormDataIsValid = () => {
        if (this.state.userName.length > 0 && this.state.firstName.length > 0) {
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
                    <div className="headerLogin">
                        {this.props.userToEdit.id ? <h2 >Edit user</h2> : <h2 >Select user</h2>} 
                    </div>
                    <div className="form-row">
                        <div className="form-gorup col-md-8 offset-md-2">
                            <div className="form-group">
                                <label >User Name</label>
                                <input className="form-control" type="text" name="userName" value={this.state.userName} onChange={this.handleInputChange} required />
                            </div>

                            <div className="form-group">
                                <label>FirstName</label>
                                <input className="form-control" type="text" name="firstName" value={this.state.firstName} onChange={this.handleInputChange} />
                            </div>

                            <div className="form-group">
                                <label>LastName</label>
                                <input className="form-control" type="text" name="lastName" value={this.state.lastName} onChange={this.handleInputChange} />
                            </div>

                            <div className="form-group">
                                <label>Phone Number</label>
                                <input className="form-control" type="text" name="phoneNumber" value={this.state.phoneNumber} onChange={this.handleInputChange} />
                            </div>

                            <div className="form-group">
                                <label>Address</label>
                                <input className="form-control" type="text" name="address" value={this.state.address} onChange={this.handleInputChange} />
                            </div>

                            <div className="form-group">
                                <label>Email</label>
                                <input className="form-control" type="text" name="email" value={this.state.email} onChange={this.handleInputChange} />
                            </div>

                            <input type="submit" value="Edit user data" className="btn btn-large btn-block btn-info" disabled={this.state.isSubmitDisabled} />

                            <input type="button" value="Cancel" onClick={() => { this.props.history.push('/residents') }} className="btn btn-large btn-block btn-danger" />
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default withRouter(EditUserForm);