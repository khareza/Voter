import React, { Component } from 'react';
import { WrapperWithMenu } from './components/WrapperWithMenu';
import { LoginWrapper as Login } from './components/LoginWrapper';
import { BrowserRouter as Router, Route, Switch, Redirect, withRouter } from "react-router-dom";
import AuthMethods from './Helpers/AuthMethods';
import PrivateComponent from './components/PrivateComponent'

class App extends Component {
    state = {
        token: localStorage.getItem("id_token"),
        logIn:true
    }

    Auth = new AuthMethods();

    _handleLogout = () => {
        this.Auth.logout();
        this.props.history.push('/about');
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route exac path="/login" component={Login} />
                    <PrivateComponent path="/" component={WrapperWithMenu} logOut={this._handleLogout} />
                </Switch>
            </Router>
        );
    }
}
export default withRouter(App);