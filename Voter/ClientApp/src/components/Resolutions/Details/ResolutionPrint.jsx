import React, { Component } from 'react';
import Moment from 'react-moment';

export default class ResolutionPrint extends Component {
    render() {
        return (
            <div>
                <div className="votingCard">
                    <div className="votingCardHeader">
                        <h3 className="votingTitle">{`${this.props.resolution.title}`}</h3>
                        <p>Expiration Date: <Moment format="dddd YYYY-MM-DD HH:mm">{this.props.resolution.expirationDate}</Moment></p>
                    </div>
                    <div className="votingData">
                        <div>
                            <p><span>Resolution No. {this.props.resolution.resolutionNumber}</span> {this.props.resolution.description}</p>
                        </div>
                        <div className="resolutionVoteFields">
                            <div className="resolutionVoteField">
                                <div><p>For</p></div>
                                <div className="voteField"></div>
                            </div>
                            <div className="resolutionVoteField">
                                <div><p>Against</p></div>
                                <div className="voteField"></div>
                            </div>
                            <div className="resolutionVoteField">
                                <div><p>Hold</p></div>
                                <div className="voteField"></div>
                            </div>
                            <div className="resolutionVoteField">
                                <div><p>Voting date</p></div>
                                <div className="voteField"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}