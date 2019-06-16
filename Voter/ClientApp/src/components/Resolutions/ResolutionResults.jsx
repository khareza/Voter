import React, { Component } from 'react';
import Moment from 'react-moment';
import { ResolutionMethods } from '../../Helpers/ResolutionMethods';
import AuthMethods from '../../Helpers/AuthMethods';
import { NotificationManager } from 'react-notifications';

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
            unsignedVotes: 0
        }

    }

    componentDidMount = () => {
        this.getResults();
    }

    getResults = () => {
        this.resolutionRequest.getResolutionWithResults(this.id)
            .then((res) => {
                this.setState({
                    resolution: res.data.resolution,
                    forVotes: res.data.forVotes,
                    holdVotes: res.data.holdVotes,
                    againstVotes: res.data.againstVotes,
                    unsignedVotes: res.data.unsignedVotes

                })
            }).catch(() => {
                NotificationManager.error('Select correct resolution', 'Error!');
                this.props.history.push(`/Resolutions/`);
            })
    }

    render() {
        return (
            <div className="resolutionResultsContainer">
                <div className="dates">
                    <div>
                        <div>
                            <span>Creation Date:</span>
                        </div>
                        <div>
                            <Moment format="dddd YYYY-MM-DD HH:mm">{this.state.resolution.creationDate}</Moment>
                        </div>
                    </div>
                    <div>
                        <div>
                            <span>Expiration Date:</span>
                        </div>
                        <div>
                            <Moment format="dddd YYYY-MM-DD HH:mm">{this.state.resolution.expirationDate}</Moment>
                        </div>
                    </div>
                </div>

                <div className="title">{this.state.resolution.title}</div>
                <div className="description"><span>Resolution No. {this.state.resolution.resolutionNumber}</span> {this.state.resolution.description}</div>
                <hr />
                <div><p className="voteTitle">Votes</p></div>
                <div className="votes">
                    <div className="votesPart">
                        <div className="forVotes voteBox">
                            <div>For</div>
                            <div>{this.state.forVotes}</div>
                        </div>
                        <div className="againsVotes voteBox">
                            <div>Against</div>
                            <div>{this.state.againstVotes}</div>
                        </div>
                    </div>
                    <div className="votesPart">
                        <div className="holdVotes voteBox">
                            <div>Hold</div>
                            <div>{this.state.holdVotes}</div>
                        </div>
                        <div className="unsigneVotes voteBox">
                            <div>Unsigned</div>
                            <div>{this.state.unsignedVotes}</div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}