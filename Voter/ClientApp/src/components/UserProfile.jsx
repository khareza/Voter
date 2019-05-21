import React, { Component } from 'react';
import { UsersListWrapper } from './UsersListWrapper';
import AuthMethods from '../Helpers/AuthMethods';
import { SideMenu } from './SideMenu';
import './UserProfile.css';

export class UserProfile extends Component {

    Auth = new AuthMethods();

    renderRegisterFormIfAdmin = () => {
        if (this.Auth.isUserAdmin()) {
            return (
                <UsersListWrapper/>
            );
        }
    }

    render() {
        return (
            <div className="row parent">
                <div className="col-md-2 d-inline-block">
                    <SideMenu logOut={this.props.logOut}/>      
                </div>
                <div className="col-md-8 d-inline-block mt-5">
                    {this.renderRegisterFormIfAdmin()}
                </div>
            </div>
        );
    }

}