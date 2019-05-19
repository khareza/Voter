import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import { Home } from './Home';
import { FetchData } from './FetchData';
import { Counter } from './Counter';
import { NavMenu } from './NavMenu';
import { UserProfile } from './UserProfile';



export class WrapperWithMenu extends Component{

    render() {
        return (
            <Router>
                <div>
                    <NavMenu logOut={this.props.logOut}/>

                    <Route exact path='/' component={Home} />
                    <Route exact path='/counter' component={Counter} />
                    <Route exact path='/fetch-data' component={FetchData} />
                    <Route exact path='/profile' render={() => (<UserProfile activeUser={this.props.activeUser} />)} />
                </div>
            </Router>
        );
    }
}