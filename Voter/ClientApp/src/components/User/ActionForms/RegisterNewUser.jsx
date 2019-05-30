import React, { Component } from 'react';
import { NotificationManager } from 'react-notifications';
import { UserMethods} from '../../../Helpers/UserMethods';
import DatePicker from 'react-datepicker';

export class RegisterNewUser extends Component {
    constructor(props) {
        super(props);

        this.UserMethods = new UserMethods();
        this.state = {
            userName: '',
            password: '',
            firstName: '',
            lastName: '',
            email: '',
            birthDate: new Date(),
            phone: '',
            address:'',
            isSubmitDisabled: true
        };
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let { userName, password, firstName, lastName, email, birthDate, phone, address } = this.state;

        this.UserMethods.register(
            { userName, password, firstName, lastName, email, birthDate, phone, address}
        ).then(() => {
            NotificationManager.success('Register Successful', 'Correct');
            this.props.history.push('/residents');
        }).catch(() => {
            NotificationManager.error('Unsuccessful user register', 'Error!', 5000, () => {
            });
        });

        //this.setState({
        //    userName: '',
        //    password: '',
        //    firstName: '',
        //    lastName: '',
        //    email: '',
        //    birthDate: '',
        //    phone: '',
        //    address: '',
        //    isSubmitDisabled: true});
    }

    handleInputChange = (event) => {
        this.setState({ [event.target.name]: event.target.value});
        this.checkIfFormDataIsValid();
    }

    handleDateChange = (date) => {
        this.setState({ birthDate: date });
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
                    <div className="headerLogin">
                        <h2 >Add new user</h2>
                    </div>
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
                                <label>Birth date</label>
                                <div>
                                    <DatePicker
                                        selected={this.state.birthDate}
                                        onChange={this.handleDateChange}
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Address</label>
                                <input className="form-control" type="text" name="address" value={this.state.address} onChange={this.handleInputChange} />
                            </div>

                            <div className="form-group">
                                <label>Email</label>
                                <input className="form-control" type="text" name="email" value={this.state.email} onChange={this.handleInputChange}/>
                            </div>

                            <div className="form-group">
                                <label>Phone</label>
                                <input className="form-control" type="text" name="phone" value={this.state.phone} onChange={this.handleInputChange} />
                            </div>


                            <input type="submit" value="Add new resident" className="btn btn-large btn-block btn-primary" disabled={this.state.isSubmitDisabled} />
                            <input type="button" value="Cancel" onClick={() => { this.props.history.push('/residents') }} className="btn btn-large btn-block btn-danger" />
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
