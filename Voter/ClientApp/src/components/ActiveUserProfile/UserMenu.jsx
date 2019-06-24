﻿import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class UserMenu extends Component {

    render() {
        return (
            <div className="userSelectMenu">
                <NavLink activeClassName="activeUserMenuElement" to="/profile/">User profile</NavLink>
                <NavLink activeClassName="activeUserMenuElement" to="/resolution_history">Resolutions history</NavLink>
            </div>       
        );
    }

}