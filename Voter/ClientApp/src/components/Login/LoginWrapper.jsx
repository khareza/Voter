import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import  Login  from './LoginForm';
import AuthMethods from '../../Helpers/AuthMethods';

export default class LoginWrapper extends Component {
    constructor(props) {
        super(props);
        this.Auth = new AuthMethods();
        if (this.Auth.loggedIn()) {
            this.props.history.push('/profile/userProfile');
            NotificationManager.error('Click logout to display login page', 'You are already logged in');
        }
    }

    render() {
        return (
            <div>
                <div className="mainLoginWrapper ">
                    <div className="row loginWrapper">
                        <Route component={Login} />
                    </div>
                </div>
            </div>
        );
    }
}