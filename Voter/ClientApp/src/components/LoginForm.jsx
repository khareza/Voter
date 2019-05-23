import React, { Component } from 'react';
import '../ComponentsStyles/Login.css';
export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
            isSubmitDisabled: true
        };
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.login({
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
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input className="form-control" type="password" name="password" value={this.state.password} onChange={this.handleInputChange} required />
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
