import React, { Component } from 'react';
import { Login } from './LoginForm';


export class LoginWrapper extends Component {

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-10 offset-md-1">
                        <Login />
                    </div>
                </div>
            </div>
        );
    }
}