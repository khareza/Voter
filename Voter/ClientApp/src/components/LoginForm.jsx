import React, { Component } from 'react';

export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: '',
            password: '',
            isSubmitDisabled: true 
        };
    }

    handleSubmit = (event) => {
        alert('A name was submitted: ' + this.state.login);
        event.preventDefault();
    }

    handleLoginChange = (event) => {
        this.setState({ login: event.target.value });
        this.checkIfFormDataIsValid();
    }

    handlePasswordChange = (event) => {
        this.setState({ password: event.target.value });
        this.checkIfFormDataIsValid();
    }

    checkIfFormDataIsValid = () => {
        if (this.state.login.length > 0 && this.state.password.length > 0) {
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
                                <label >User name</label>
                                <input className="form-control" type="text" name="UserName" value={this.state.value} onChange={this.handleLoginChange} required />
                            </div>

                            <div className="form-group">
                                <label>Password</label>
                                <input className="form-control" type="password" name="Password" value={this.state.password} onChange={this.handlePasswordChange} required />
                            </div>

                            <input type="submit" value="Log In" className="btn btn-large btn-block btn-success" disabled={this.state.isSubmitDisabled}/>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
