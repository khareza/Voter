import React, { Component } from 'react';
import { WrapperWithMenu } from './components/WrapperWithMenu';
import { LoginWrapper as Login } from './components/LoginWrapper';
import { BrowserRouter as Router, Route, Switch, withRouter } from "react-router-dom";
import AuthMethods from './Helpers/AuthMethods';
import PrivateComponent from './components/PrivateComponent'

class App extends Component {
    state = {
        token: localStorage.getItem("id_token"),
        activeUser: {}
    }

    Auth = new AuthMethods();

    handleLogout = () => {
        this.Auth.logout();
        this.setActiveUser({});
        this.props.history.push('/login');
    }

    setActiveUser = (activeUser) => {

        this.setState({ activeUser})
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route exac path="/login" component={Login}/>
                    <PrivateComponent path="/" component={WrapperWithMenu} logOut={this.handleLogout} />
                </Switch>
            </Router>
        );
    }
}
export default withRouter(App);