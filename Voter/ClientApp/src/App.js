import React, { Component } from 'react';
import { NotificationContainer } from 'react-notifications';
import { BrowserRouter as Router, Route, Switch, withRouter } from "react-router-dom";
import { LoginWrapper as Login } from './components/LoginWrapper';
import PrivateComponent from './components/PrivateComponent'
import { UserProfile } from './components/UserProfile';
import AuthMethods from './Helpers/AuthMethods';
import 'react-notifications/lib/notifications.css';


class App extends Component {
    state = {
        token: localStorage.getItem("id_token"),
    }

    Auth = new AuthMethods();

    handleLogout = () => {
        this.Auth.logout();
        this.props.history.push('/login');
    }

    render() {
        return (
            <div>
                <NotificationContainer />

                <Router>
                    <Switch>
                        <Route exac path="/login" component={Login} />
                        <PrivateComponent path="/" component={UserProfile} logOut={this.handleLogout} />
                    </Switch>
                </Router>
            </div>
        );
    }
}
export default withRouter(App);