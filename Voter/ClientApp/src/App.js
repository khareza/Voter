import React, { Component } from 'react';
import { WrapperWithMenu } from './components/WrapperWithMenu';
import { LoginWrapper as Login } from './components/LoginWrapper';
import { BrowserRouter as Router, Route } from "react-router-dom";

export default class App extends Component {
    state = {
        token: localStorage.getItem("token"),
        activeUser: JSON.parse(localStorage.getItem("user"))
    }

    setToken = (token) => {
        localStorage.setItem("token", token);
        this.setState(
            { token: localStorage.getItem("token") }
        );
    }

    setUser = (activeUser) => {
        console.log(activeUser);
        localStorage.setItem("user", JSON.stringify(activeUser));
        this.setState(
            { activeUser: JSON.parse(localStorage.getItem("user")) }
        );
    }

    logOut = () => {

        this.setToken("");
        this.setUser({});
    }

    render() {
        return (
            <Router>
                <div>
                    <Route exac path='/'
                        render={() => (localStorage.getItem("token") ?
                            <WrapperWithMenu logOut={this.logOut} activeUser={this.state.activeUser}/> :
                            <Login setToken={this.setToken} setUser={this.setUser} />)}
                    />
                </div>
            </Router>
        );
    }
}
                    //<Route exac strict path='/' render={() => (localStorage.getItem("token") ? <Menu /> : <Login saveToken={this.saveToken} />)}/>