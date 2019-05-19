import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Home } from './Home';
import { FetchData } from './FetchData';
import { Counter } from './Counter';

export class WrapperWithMenu extends Component{

    render() {
        return (
            <Router>
                <div>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/counter">Counter</Link>
                        </li>
                        <li>
                            <Link to="/fetch-data">FetchData</Link>
                        </li>
                    </ul>

                    <Route exact path='/' component={Home} />
                    <Route exact path='/counter' component={Counter} />
                    <Route exact path='/fetch-data' component={FetchData} />
                </div>
            </Router>
        );
    }
}