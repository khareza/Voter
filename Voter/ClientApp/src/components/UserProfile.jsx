import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { SideMenu } from './SideMenu';
import { SideDrawer } from './SideDrawer/SideDrawer';
import Backdrop from './SideDrawer/Backdrop';
import { ActiveUserDetails } from './ActiveUserProfile/ActiveUserDetails';
import { UsersListWrapper } from './User/UsersListWrapper';
import { ResolutionsListWrapper } from './Resolutions/ResolutionsListWrapper';
import AuthMethods from '../Helpers/AuthMethods';

export class UserProfile extends Component {

    state = {
        sideDrawerOpen: false
    }

    Auth = new AuthMethods();

    renderResidentsRouteIfAdmin = () => {
        if (this.Auth.isUserAdmin()) {
            return (
                <Route path="/residents" component={UsersListWrapper} />
            );
        }
    }

    drawerToggleClickHandler = () => {
        this.setState((prevState) => {
            return { sideDrawerOpen: !prevState.sideDrawerOpen }
        });
    }

    backdropClickHandler = () => {
        this.setState({ sideDrawerOpen:false});
    }

    render() {
        return (
            <div className="site">
                <Route render={() => <SideMenu drawerClickHandler={this.drawerToggleClickHandler} />} />
                {this.state.sideDrawerOpen ? <Backdrop click={this.backdropClickHandler} /> : null}
                <Route render={() => <SideDrawer show={this.state.sideDrawerOpen} />} />
                <div className="content">
                    <Route path="/profile" component={ActiveUserDetails} />
                    <Route path="/resolutions" component={ResolutionsListWrapper} />
                    {this.renderResidentsRouteIfAdmin()}
                </div>
            </div>
        );
    }
}