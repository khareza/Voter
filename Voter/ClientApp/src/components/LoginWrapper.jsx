import React, { Component } from 'react';
import { Login } from './LoginForm';
import AuthMethods from '../Helpers/AuthMethods';

export class LoginWrapper extends Component {

    constructor(props) {
        super(props);
        this.Auth = new AuthMethods();
        if (this.Auth.loggedIn())
            this.props.history.push('/menu');
    }
    

    login = (loginFormData) => {
        console.log(this.props);
        this.Auth.login(loginFormData)
            .then(res => {
                if (res === false) {
                    return alert("Wrong login or password");
                }
                this.props.history.push('/menu');
            })
            .catch(err => {
                alert("Wrong login or password");
            })
    }


    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-10 offset-md-1">
                        <Login login={this.login} />
                    </div>
                </div>
            </div>
        );
    }
}