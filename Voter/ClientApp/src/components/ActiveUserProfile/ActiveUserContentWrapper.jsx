/// <reference path="../resolutions/resolutionresults.jsx" />
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import UserMenu from './UserMenu';
import UserProfile from './Content/UserProfile';
import ResolutionsHistoryList from './Content/ResolutionsHistoryList';
import ResolutionHistoryDetails from '../Resolutions/ResolutionResults';
import UserVotesList from '../Resolutions/UserVotesList';

export default class ActiveUserContentWrapper extends Component {

    handleShowVoters = (id) => {
        this.props.history.push(`/profile/resolution_history/${id}/votes`);
    }

    handleBackPageFromVoter = (id) => {
        this.props.history.push(`/profile/resolution_history/${id}`);
    }

    handleBackPage = () => {
        this.props.history.push(`/profile/resolution_history/`);
    }

    render() {
        return (
            <div className="profileWrapper">
                <div className="profileMenu">
                    <UserMenu />
                </div>
                <div className="profileContent">
                    <Route path="/profile/userProfile" component={UserProfile} />
                    <Route exact path="/profile/resolution_history" component={ResolutionsHistoryList} />

                    <Route exact path="/profile/resolution_history/:resolution_id" render={() => (
                        <ResolutionHistoryDetails
                            handleShowVoters={this.handleShowVoters}
                            handleBackPage={this.handleBackPage} />)} />

                    <Route exact path="/profile/resolution_history/:resolution_id/votes" render={() => (
                        <UserVotesList
                            handleBackPage={this.handleBackPageFromVoter} />)} />

                </div>
            </div>
        );
    }

}

