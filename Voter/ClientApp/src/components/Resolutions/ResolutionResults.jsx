import React, { Component } from 'react';
import Moment from 'react-moment';
import { ResolutionMethods } from '../../Helpers/ResolutionMethods';
import AuthMethods from '../../Helpers/AuthMethods';
import VotingResultsChart from '../Charts/VotingResultsChart';
import { NotificationManager } from 'react-notifications';
import { config } from '@fortawesome/fontawesome-svg-core';

export default class ResolutionResults extends Component {

    constructor(props) {
        super(props);

        this.resolutionRequest = new ResolutionMethods();
        this.authRequest = new AuthMethods();
        this.id = this.props.match.params.resolution_id;
        this.state = {
            resolution: {},
            forVotes: 0,
            holdVotes: 0,
            againstVotes: 0,
            unsignedVotes: 0,
            numberOfUsers: 0,
            isContentLoaded: false
        }
    }

    componentDidMount = () => {
        this.getResults();
    }

    getResults = () => {
        this.setState({ isContentLoaded: false });
        this.resolutionRequest.getResolutionWithResults(this.id)
            .then((res) => {
                console.log(res.data);
                this.setState({
                    resolution: res.data.resolution,
                    forVotes: res.data.forVotes,
                    holdVotes: res.data.holdVotes,
                    againstVotes: res.data.againstVotes,
                    unsignedVotes: res.data.unsignedVotes,
                    numberOfUsers: res.data.numberOfUsers,
                    isContentLoaded: true
                })

            }).catch(() => {
                NotificationManager.error('Select correct resolution', 'Error!');
                this.props.history.push(`/Resolutions/`);
            })
    }

    handleShowVoters = () => {
        this.props.history.push(`/resolutions/results/${this.id}/votes`);
    }

    handleBackPage = () => {
        this.props.history.push(`/resolutions/`);
    }

    handleChartRender = () => {
        return this.state.numberOfUsers
            ? (<div>
                <div>
                    <p className="voteTitle">Votes</p>
                </div>
                <VotingResultsChart votes={{
                    forVotes: this.state.forVotes,
                    holdVotes: this.state.holdVotes,
                    againstVotes: this.state.againstVotes,
                    unsignedVotes: this.state.unsignedVotes
                }} />
            </div>) : <h3>No available users</h3>

    }

    render() {
        return (
            <div className="resolutionResultsContainer">
                <div className="title">{this.state.resolution.title}</div>
                <div className="dates">
                    <div>
                        <span>Expiration Date:</span>
                    </div>
                    <div>
                        <Moment format="dddd YYYY-MM-DD HH:mm">{this.state.resolution.expirationDate}</Moment>
                    </div>
                </div>
                <div className="description"><span>Resolution No. {this.state.resolution.resolutionNumber}</span> {this.state.resolution.description}</div>
                <hr />

                {this.state.isContentLoaded
                    ? this.handleChartRender()
                    : <div className="spinner"></div>}
                <div className="resolutionResultButtons">
                    {this.state.numberOfUsers ? <button className="btn btn-primary" onClick={this.handleShowVoters}>Show voters</button> : null}  
                    <button className="btn btn-warning" onClick={this.handleBackPage}>Come back to resolutions</button>
                </div>
            </div>
        );
    }
}