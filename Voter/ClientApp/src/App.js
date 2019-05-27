import React, { Component } from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { BrowserRouter as Router, Route, Switch, withRouter } from "react-router-dom";
import { LoginWrapper as Login} from './components/Login/LoginWrapper';
import PrivateComponent from './components/PrivateComponent'
import { UserProfile } from './components/UserProfile';
import AuthMethods from './Helpers/AuthMethods';
import 'react-notifications/lib/notifications.css';
import './ComponentsStyles/Login.css';
import './ComponentsStyles/UserDetails.css';

class App extends Component {
    state = {
        token: localStorage.getItem("id_token"),
    }

    Auth = new AuthMethods();

    handleLogout = () => {
        this.Auth.logout();
        this.props.history.push('/login');
        NotificationManager.success('Logout Successful', 'Correct');
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