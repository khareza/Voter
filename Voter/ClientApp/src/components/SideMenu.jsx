import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import '../ComponentsStyles/SideMenu.css';
import AuthMethods from '../Helpers/AuthMethods';

export class SideMenu extends Component {

    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true
        };
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    Auth = new AuthMethods();

    renderRegisterTabIfAdmin = () => {
        if (this.Auth.isUserAdmin()) {
            return (
                <li><NavLink to="/residents">Residents</NavLink></li>
            );
        }
    }

    render() {
        return (
            <header className="header" role="banner">
                <h1 className="logo">
                    <a href="/profile">Your <span>Voter</span></a>
                </h1>
                <div className="nav-wrap">
                    <nav className="main-nav">
                        <ul className="unstyled list-hover-slide">
                            <li><NavLink to="/profile">My profile</NavLink></li>
                            {this.renderRegisterTabIfAdmin()}
                            <li><NavLink to="/resolutions">Resolutions</NavLink></li>
                        </ul>
                    </nav>
                </div>
                <button className="btn btn-danger logOutBtn" onClick={this.props.logOut}>Logout</button>
            </header>
        );
    }
}