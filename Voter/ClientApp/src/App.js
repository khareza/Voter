import React, { Component } from 'react';
import { LoginWrapper as Login } from './components/LoginWrapper';
import { BrowserRouter as Router, Route, Switch, withRouter } from "react-router-dom";
import AuthMethods from './Helpers/AuthMethods';
import PrivateComponent from './components/PrivateComponent'
import { UserProfile } from './components/UserProfile';


class App extends Component {
    state = {
        token: localStorage.getItem("id_token"),
    }

    Auth = new AuthMethods();

    handleLogout = () => {
        this.Auth.logout();
        this.setActiveUser({});
        this.props.history.push('/login');
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route exac path="/login" component={Login}/>
                    <PrivateComponent path="/" component={UserProfile} logOut={this.handleLogout} />
                </Switch>
            </Router>
        );
    }
}
export default withRouter(App);