import React, { Component } from 'react';
import Moment from 'react-moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faBan, faHandPaper, faQuestionCircle } from '@fortawesome/free-solid-svg-icons'

export default class UserResolutionHistory extends Component {

    setResultIconAndStyle  = () => {
        let resultIcon = '';
        let resultStyle = 'activeResolution';
        if (this.props.resolution.resolution.resolutionStatus==="Accepted") {
            resultIcon = faCheck;
            resultStyle = 'acceptedResolution';
        }
        else {
            resultIcon = faBan;
            resultStyle = 'rejectedResolution';
        }
        return { resultIcon, resultStyle};
    }

    setVoteIconAndStyle = () => {
        var vote = this.props.resolution.vote;
        let voteIcon = '';
        let voteStyle = '';
        switch (vote) {
            case 'For':
                voteIcon = faCheck;
                voteStyle = 'forUserVote';
                break;
            case 'Against':
                voteIcon = faBan;
                voteStyle = 'againstUserVote';
                break;
            case 'Hold':
                voteIcon = faHandPaper;
                voteStyle = 'holdUserVote';
                break;
            default:
                voteIcon = faQuestionCircle;
                voteStyle = 'unsignedUserVote';

        }
        return { voteIcon, voteStyle};
    }

    render() {
        const userVote = this.setVoteIconAndStyle();
        const resolutionResult = this.setResultIconAndStyle();
        const resolutionResultStyles = `resolutionResult ${resolutionResult.resultStyle}` 
        const resolutionUserVoteStyles = `resolutionUserVote ${userVote.voteStyle}` 

        return (
            <div>
                <div className="resolutionCard">
                    <div className="resolutionCardHeader">
                        <h4 className="resolutionTitle">{`${this.props.resolution.resolution.title}`}</h4>
                        <p>Voting end <Moment fromNow="dddd YYYY-MM-DD HH:mm">{this.props.resolution.resolution.expirationDate}</Moment></p>
                    </div>
                    <div className="resolutionData">
                        <div>
                            <p><span>Resolution No. {this.props.resolution.resolutionNumber}</span> {this.props.resolution.resolution.description}</p>
                        </div>
                        <div className="resolutionResults">
                            <div className={resolutionResultStyles}>
                                <h4>Resolution result</h4>
                                {this.props.resolution.resolution.resolutionStatus === "Active"
                                    ? <p>Resolution is still active</p>
                                    : <span><FontAwesomeIcon icon={resolutionResult.resultIcon}></FontAwesomeIcon></span>
                                    }
                            </div>
                            <div className={resolutionUserVoteStyles}>
                                <h4>My vote</h4>
                                <span><FontAwesomeIcon icon={userVote.voteIcon}></FontAwesomeIcon></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}