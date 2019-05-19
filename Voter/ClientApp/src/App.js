import React, { Component } from 'react';
import { WrapperWithMenu as Menu } from './components/WrapperWithMenu';
import { LoginWrapper as Login } from './components/LoginWrapper';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Router>
                <div>
                    <Route exact path='/' component={Menu} />
                    <Route path='/login' component={Login} />
                </div>
            </Router>
        );
    }
}
