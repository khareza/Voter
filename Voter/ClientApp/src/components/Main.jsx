import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import SideMenu from './SideMenu';
import SideDrawer from './SideDrawer/SideDrawer';
import Backdrop from './SideDrawer/Backdrop';
import ActiveUserContentWrapper from './ActiveUserProfile/ActiveUserContentWrapper';
import UsersContentWrapper from './User/UsersContentWrapper';
import ResolutionsContentWrapper from './Resolutions/ResolutionsContentWrapper';
import AuthMethods from '../Helpers/AuthMethods';

export default class Main extends Component {

    state = {
        sideDrawerOpen: false
    }

    Auth = new AuthMethods();

    renderResidentsRouteIfAdmin = () => {
        if (this.Auth.isUserAdmin()) {
            return (
                <Route path="/residents" component={UsersContentWrapper} />
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
                {this.state.sideDrawerOpen ? <Backdrop click={this.backdropClickHandler} /> : null}
                <SideMenu drawerClickHandler={this.drawerToggleClickHandler} />
                <SideDrawer show={this.state.sideDrawerOpen}/>
                <div className="content">
                    <Route path="/profile" component={ActiveUserContentWrapper} />
                    <Route path="/resolutions" component={ResolutionsContentWrapper} />
                    {this.renderResidentsRouteIfAdmin()}
                </div>
            </div>
        );
    }
}