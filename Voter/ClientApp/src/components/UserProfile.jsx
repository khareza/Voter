import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { SideMenu } from './SideMenu';
import { ActiveUserDetails } from './ActiveUserProfile/ActiveUserDetails';
import { UsersListWrapper } from './User/UsersListWrapper';
import { ResolutionsListWrapper } from './Resolutions/ResolutionsListWrapper';
import AuthMethods from '../Helpers/AuthMethods';

export class UserProfile extends Component {
    Auth = new AuthMethods();

    renderResidentsRouteIfAdmin = () => {
        if (this.Auth.isUserAdmin()) {
            return (
                <Route path="/residents" component={UsersListWrapper} />
            );
        }
    }

    render() {
        return (
            <div className="site">
                <div className="menuWrapper">
                    <Route component={SideMenu} />
                </div>
                <div className="content">
                    <Route path="/profile" component={ActiveUserDetails} />
                    <Route path="/resolutions" component={ResolutionsListWrapper} />
                    {this.renderResidentsRouteIfAdmin()}
                </div>
            </div>
        );
    }
}