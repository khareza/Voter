import React, { Component } from 'react';
import { Route} from 'react-router-dom';
import { Login } from './LoginForm';
import AuthMethods from '../../Helpers/AuthMethods';
import { NotificationManager } from 'react-notifications';

export class LoginWrapper extends Component {
    constructor(props) {
        super(props);
        this.Auth = new AuthMethods();
        if (this.Auth.loggedIn()) {
            this.props.history.push('/profile');
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