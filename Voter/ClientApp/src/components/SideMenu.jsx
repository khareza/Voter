import React, { Component } from 'react';
import { NavLink, withRouter  } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import AuthMethods from '../Helpers/AuthMethods';
import DrawerToggleButton from './SideDrawer/DrawerToggleButton';

class SideMenu extends Component {
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
                <div className="headerFlex">
                    <h1 className="logo">
                        <a href="/">Your <span>Voter</span></a>
                    </h1>
                    <div>
                        <DrawerToggleButton click={this.props.drawerClickHandler} />
                    </div>
                    <div className="nav-wrap">
                        <nav className="main-nav">
                            <ul className="unstyled list-hover-slide">
                                <li><NavLink to="/">My profile</NavLink></li>
                                {this.renderRegisterTabIfAdmin()}
                                <li><NavLink to="/resolutions">Resolutions</NavLink></li>
                            </ul>
                        </nav>
                    </div>
                </div>
                <button className="btn btn-danger logOutBtn" onClick={this.handleLogout}>Logout</button>
            </header>
        );
    }
}

export default withRouter(SideMenu);