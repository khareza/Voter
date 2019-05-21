import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import { NavMenu } from './NavMenu';
import { UserProfile } from './UserProfile';

export class WrapperWithMenu extends Component{

    render() {
        return (
            <Router>
                <div>
                    <NavMenu logOut={this.props.logOut}/>
                    <Route exact path='/profile' component={UserProfile} />
                </div>
            </Router>
        );
    }
}