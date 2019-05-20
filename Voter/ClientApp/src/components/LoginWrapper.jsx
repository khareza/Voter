import React, { Component } from 'react';
import { Login } from './LoginForm';
import AuthMethods from '../Helpers/AuthMethods';

export class LoginWrapper extends Component {

    Auth = new AuthMethods();

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

    //componentWillMount() {
    //    if (this.Auth.loggedIn())
    //        this.props.history.replace('/');
    //}

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