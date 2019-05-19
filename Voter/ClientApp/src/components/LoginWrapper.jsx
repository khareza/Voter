import React, { Component } from 'react';
import axios from 'axios';
import { Login } from './LoginForm';

export class LoginWrapper extends Component {


    login = (loginFormData) => {
        axios.post("http://localhost:64763/api/voter/login", loginFormData)
            .then(res => {
                //toast().succsess("success");
                this.props.setToken(res.data.token);
                this.setUser();
            }).catch(err => {
                //toast().error("Errors");
                console.log(err);
            });
    }

    setUser = () =>
    {
        axios.defaults.headers.common = { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        axios.get("http://localhost:64763/api/UserProfile/GetUserProfile")
            .then(res => {
                this.props.setUser(res.data);
            }).catch(err => {
                //toast().error("Errors");
                console.log(err);
            });

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