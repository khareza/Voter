import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import AuthMethods from '../../Helpers/AuthMethods';

export class SideDrawer extends Component {
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
        let drawerClass = 'sideHeader';
        if (this.props.show) {
            drawerClass = 'sideHeader open'
        }
        return (
            <header className={drawerClass}>
                <h1 className="sideLogo">
                    <a href="/profile">Your <span>Voter</span></a>
                </h1>
                <div className="side-nav-wrap">
                    <nav className="side-main-nav">
                        <ul className="side-unstyled side-list-hover-slide">
                            <li><NavLink to="/profile">My profile</NavLink></li>
                            {this.renderRegisterTabIfAdmin()}
                            <li><NavLink to="/resolutions">Resolutions</NavLink></li>
                        </ul>
                    </nav>
                </div>
                <button className="btn btn-danger sideLogoutBtn" onClick={this.handleLogout}>Logout</button>
            </header>
        );
    }
}