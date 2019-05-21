import React, { Component } from 'react';
import './SideMenu.css';

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

    render() {
        return (
            <header className="header" role="banner">
                <h1 className="logo">
                    <a href="/profile">Your <span>Voter</span></a>
                </h1>
                <div className="nav-wrap">
                    <nav className="main-nav">
                        <ul className="unstyled list-hover-slide">
                            <li><a href="/profile">My profile</a></li>
                            <li><a href="/residents">Residents</a></li>
                            <li><a href="/acts">Resolutions</a></li>
                        </ul>
                    </nav>
                    
                </div>
                <button className="btn btn-danger logOutBtn" onClick={this.props.logOut}>LogOut</button>
            </header>
        );
    }
}