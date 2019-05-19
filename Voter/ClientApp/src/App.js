import React, { Component } from 'react';
import { WrapperWithMenu as Menu } from './components/WrapperWithMenu';
import { LoginWrapper as Login } from './components/LoginWrapper';
import { BrowserRouter as Router, Route} from "react-router-dom";


export default class App extends Component {
    state = {
        token: ''
    }

    saveToken = (token) => {
        this.setState({ token });
        console.log(`Token has been saved ${this.state.token}`);
    }

    render() {
        return (
            <Router>
                <div>
                    <Route exact path='/' component={Menu} />
                    <Route path='/login' component={() => <Login saveToken={this.saveToken}/>} />
                </div>
            </Router>
        );
    }
}
