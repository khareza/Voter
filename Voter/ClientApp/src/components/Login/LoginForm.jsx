import React, { Component } from 'react';
import { NotificationManager } from 'react-notifications';
import AuthMethods from '../../Helpers/AuthMethods';
import { Error } from '../Error';

export class Login extends Component {
    constructor(props) {
        super(props);
        this.Auth = new AuthMethods();
        this.state = {
            userName: '',
            password: '',
            isSubmitDisabled: true,
            errors: {}
        };
    }

    login = (loginFormData) => {
        this.Auth.login(loginFormData)
            .then(res => {
                NotificationManager.success('Login Successful', 'Correct');
                this.props.history.push('/profile');
            }).catch(err => {
                NotificationManager.error('Wrong login or password', 'Error!');
                this.handleInputErrors(err.response.data.errors);
            })
    }

    handleInputErrors = (errors) => {
        let errorsArray = [];
        for (var field in errors) {
            errorsArray[field] = errors[field];
        }
        this.setState({ errors: errorsArray });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.login({
            userName: this.state.userName,
            password: this.state.password
        });
    }

    handleInputChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
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
            <div className="loginForm">
                <div className="headerLogin">
                    <h2 >LOGIN</h2>
                </div>
                <form onSubmit={this.handleSubmit} autoComplete="off">
                    <div className="form-gorup col-md-8 offset-md-2">
                        <div className="form-group">
                            <label >User name</label>
                            <input className="form-control" type="text" name="userName" value={this.state.userName} onChange={this.handleInputChange} required />
                            {this.state.errors['UserName'] ? <Error messages={this.state.errors['UserName']} /> : null}
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input className="form-control" type="password" name="password" value={this.state.password} onChange={this.handleInputChange} required />
                            {this.state.errors['Password'] ? <Error messages={this.state.errors['Password']} /> : null}
                        </div>

                        <input type="submit" value="Log In" className="btn btn-large btn-block btn-success" disabled={this.state.isSubmitDisabled} />
                    </div>
                </form>
                <div className="footerLogin">
                    <a>Forgot password</a>
                </div>
            </div>
        );
    }
}
