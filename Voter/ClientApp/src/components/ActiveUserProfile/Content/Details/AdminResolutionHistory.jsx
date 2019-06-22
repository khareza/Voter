import React, { Component } from 'react';
import Moment from 'react-moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faBan,} from '@fortawesome/free-solid-svg-icons'

export default class AdminResolutionHistory extends Component {

    setResultIconAndStyle = () => {
        let resultIcon = '';
        let resultStyle = 'activeResolution';
        if (this.props.resolution.resolutionStatus === "Accepted") {
            resultIcon = faCheck;
            resultStyle = 'acceptedResolution';
        }
        else {
            resultIcon = faBan;
            resultStyle = 'rejectedResolution';
        }
        return { resultIcon, resultStyle };
    }

    render() {
        const resolutionResult = this.setResultIconAndStyle();
        const resolutionResultStyles = `resolutionResult ${resolutionResult.resultStyle}`

        return (
            <div>
                <div className="resolutionCard">
                    <div className="resolutionCardHeader">
                        <h4 className="resolutionTitle">{`${this.props.resolution.title}`}</h4>
                        <p>Voting end <Moment fromNow="dddd YYYY-MM-DD HH:mm">{this.props.resolution.expirationDate}</Moment></p>
                    </div>
                    <div className="resolutionData">
                        <div>
                            <p><span>Resolution No. {this.props.resolution.resolutionNumber}</span> {this.props.resolution.description}</p>
                        </div>
                        <div className="resolutionResults">
                            <div className={resolutionResultStyles}>
                                <h4>Resolution state</h4>
                                {this.props.resolution.resolutionStatus === "Active"
                                    ? <p>Resolution is still active</p>
                                    : <span><FontAwesomeIcon icon={resolutionResult.resultIcon}></FontAwesomeIcon></span>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}