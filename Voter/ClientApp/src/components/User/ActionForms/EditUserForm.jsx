import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import { UserMethods } from '../../../Helpers/UserMethods';
import { Error } from '../../Error';

class EditUserForm extends Component {
    constructor(props) {
        super(props);
        this.UserMethods = new UserMethods();
        this.id = this.props.match.params.user_id;
        this.state = {
            userName: '',
            firstName: '',
            lastName: '',
            address: '',
            email: '',
            phoneNumber: '',
            isSubmitDisabled: true,
            errors: {}
        };
    }

    componentDidMount = () => {
        this.getUser();
    }

    getUser = () => {
        const user = this.props.getUserToEdit(this.id);
        console.log(user);

        if (typeof user === 'undefined')
        {
            this.props.history.push('/residents')
            NotificationManager.error('Choose correct user', 'Error!');
        }
        else {
            this.setState({
                userName: user.userName,
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address ? user.address : '',
                email: user.email,
                phoneNumber: user.phoneNumber ? user.phoneNumber : '',
                isSubmitDisabled: true,
            })
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let { userName, firstName, lastName, address, email, phoneNumber } = this.state.user;

        this.UserMethods.editUser(
            { id: this.props.userToEdit.id, userName, firstName, lastName, address, email, phoneNumber }
        ).then((res) => {
            NotificationManager.success('Edit Successful', 'Correct');

            this.props.history.push('/residents')
        }).catch((err) => {
            NotificationManager.error('Unsuccessful user edit', 'Error!');
            this.handleInputErrors(err.response.data.errors);
        });
    }

    handleInputErrors = (errors) => {
        let errorsArray = [];
        for (var field in errors) {
            errorsArray[field] = errors[field];
        }
        this.setState({ errors: errorsArray });
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
                                <input className="form-control" type="text" name="userName" value={this.state.userName} onChange={this.handleInputChange} />
                                {this.state.errors['UserName'] ? <Error messages={this.state.errors['UserName']} /> : null}
                            </div>

                            <div className="form-group">
                                <label>FirstName</label>
                                <input className="form-control" type="text" name="firstName" value={this.state.firstName} onChange={this.handleInputChange} />
                                {this.state.errors['FirstName'] ? <Error messages={this.state.errors['FirstName']} /> : null}
                            </div>

                            <div className="form-group">
                                <label>LastName</label>
                                <input className="form-control" type="text" name="lastName" value={this.state.lastName} onChange={this.handleInputChange} />
                                {this.state.errors['LastName'] ? <Error messages={this.state.errors['LastName']} /> : null}
                            </div>

                            <div className="form-group">
                                <label>Phone Number</label>
                                <input className="form-control" type="text" name="phoneNumber" value={this.state.phoneNumber} onChange={this.handleInputChange} />
                                {this.state.errors['Phone'] ? <Error messages={this.state.errors['Phone']} /> : null}
                            </div>

                            <div className="form-group">
                                <label>Address</label>
                                <input className="form-control" type="text" name="address" value={this.state.address} onChange={this.handleInputChange} />
                                {this.state.errors['Address'] ? <Error messages={this.state.errors['Address']} /> : null}
                            </div>

                            <div className="form-group">
                                <label>Email</label>
                                <input className="form-control" type="text" name="email" value={this.state.email} onChange={this.handleInputChange} />
                                {this.state.errors['Email'] ? <Error messages={this.state.errors['Email']} /> : null}
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