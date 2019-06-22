import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import UserMenu from './UserMenu';
import UserProfile from './Content/UserProfile';
import ResolutionsHistoryList from './Content/ResolutionsHistoryList';
import ResolutionHistoryDetails from './Content/Details/ResolutionHistoryDetails';

export default class ActiveUserContentWrapper extends Component {

    render() {
        return (
            <div className="profileWrapper">
                <div className="profileMenu">
                    <UserMenu />
                </div>
                <div className="profileContent">
                    <Route path="/profile/userprofile" component={UserProfile} />
                    <Route path="/profile/resolution_history" component={ResolutionsHistoryList} />
                    <Route path="/profile/resolution_history/:resolution_id" component={ResolutionHistoryDetails} />
                </div>
            </div>
        );
    }

}

