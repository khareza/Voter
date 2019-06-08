import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import AuthMethods from '../Helpers/AuthMethods';

export class SideMenu extends Component {
    Auth = new AuthMethods();

    renderRegisterTabIfAdmin = () => {
        if (this.Auth.isUserAdmin()) {
            return (
                <li><NavLink to="/residents">Residents</NavLink></li>
            );
        }
    }

    handleLogout = () => {
        this.Auth.logout();
        this.props.history.push('/login');
        NotificationManager.success('Logout Successful', 'Correct');
    }

    render() {
        return (
            <header className="header">
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
                <button className="btn btn-danger logOutBtn" onClick={this.handleLogout}>Logout</button>
            </header>
        );
    }
}