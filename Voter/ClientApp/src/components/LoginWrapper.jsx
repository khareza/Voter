import React, { Component } from 'react';
import { Login } from './LoginForm';
import AuthMethods from '../Helpers/AuthMethods';
import { NotificationManager } from 'react-notifications';
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
                NotificationManager.success('Login Successful', 'Correct');
                this.props.history.push('/profile');
            }).catch(err => {
                NotificationManager.error('Wrong login or password', 'Error!', 5000, () => {
                });
            })
    }


    render() {
        return (
            <div>

                <div className="mainLoginWrapper ">
                    <div className="row loginWrapper">
                        <Login login={this.login} />
                    </div>
                </div>
            </div>
        );
    }
}