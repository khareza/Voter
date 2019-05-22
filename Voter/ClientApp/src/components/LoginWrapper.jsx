import React, { Component } from 'react';
import { Login } from './LoginForm';
import AuthMethods from '../Helpers/AuthMethods';

export class LoginWrapper extends Component {
    constructor(props) {
        super(props);
        this.Auth = new AuthMethods();
        if (this.Auth.loggedIn())
            this.props.history.push('/profile');
    }
    

    login = (loginFormData) => {
        console.log(this.props);
        this.Auth.login(loginFormData)
            .then(res => {
                if (res === false) {
                    return alert("Wrong login or password");
                }
                this.props.history.push('/profile');
            }).catch(err => {
                alert("Wrong login or password");
            })
    }


    render() {
        return (
            <div className="container">
                <div className="row loginWrapper">
                    <div className="col-md-10 offset-md-1">
                        <Login login={this.login} />
                    </div>
                </div>
            </div>
        );
    }
}