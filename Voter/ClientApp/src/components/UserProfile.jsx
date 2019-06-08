import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { SideMenu } from './SideMenu';
import { ActiveUserDetails } from './ActiveUserDetails';
import { UsersListWrapper } from './User/UsersListWrapper';
import { ResolutionsListWrapper } from './Resolutions/ResolutionsListWrapper';

export class UserProfile extends Component {
    render() {
        return (
            <div className="site">
                <div className="menuWrapper">
                    <Route component={SideMenu} />
                </div>
                <div className="content">
                    <Route path="/profile" component={ActiveUserDetails} />
                    <Route path="/residents" component={UsersListWrapper} />
                    <Route path="/resolutions" component={ResolutionsListWrapper} />
                </div>
            </div>
        );
    }
}