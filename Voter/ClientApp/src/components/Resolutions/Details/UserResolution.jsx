import React, { Component } from 'react';
import Moment from 'react-moment';
import { NotificationManager } from 'react-notifications';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faBan, faHandPaper } from '@fortawesome/free-solid-svg-icons'
import { UserMethods } from '../../../Helpers/UserMethods';
import AuthMethods from '../../../Helpers/AuthMethods';

export class UserResolution extends Component {

    userRequest = new UserMethods();
    authRequest = new AuthMethods();

    resolutionButtonHandler = (vote) => {
        const voterId = this.authRequest.getUserId();
        const resolutionId = this.props.resolution.id;
        this.userRequest.sendVote({ voterId, resolutionId, vote })
            .then(() => {
                this.props.deleteResolutionFromList(resolutionId);
                NotificationManager.success('Vote sent', 'Correct');
            })
            .catch((err) => {
                NotificationManager.error('Incorrect action', 'Error');
            });
    }

    render() {
        return (
            <div>
                <div className="resolutionCard">
                    <div className="resolutionCardHeader">
                        <p>{`${this.props.resolution.title}`}</p>
                        <p>Expiration Date: <Moment format="dddd YYYY-MM-DD HH:mm">{this.props.resolution.expirationDate}</Moment></p>
                        <p>Voting ends <Moment fromNow="dddd YYYY-MM-DD HH:mm">{this.props.resolution.expirationDate}</Moment></p>
                    </div>
                    <div className="resolutionData">
                        <div>
                            <p><span>Resolution No. {this.props.resolution.resolutionNumber}</span> {this.props.resolution.description}</p>
                        </div>
                        <div className="resolutionButtons">
                            <a className="button buttonAccept" name="For" onClick={() => {
                                this.props.setDialogConfig({
                                    acceptedAction: () => { this.resolutionButtonHandler("For") }, message: "Hello"
                                })
                            }}>
                                <span><FontAwesomeIcon icon={faCheck}></FontAwesomeIcon></span></a>

                            <a className="button buttonAgainst" name="Against" onClick={() => {
                                this.props.setDialogConfig({
                                    acceptedAction: () => { this.resolutionButtonHandler("Against") }, message: "Hello"
                                })

                            }}><span><FontAwesomeIcon icon={faBan}></FontAwesomeIcon></span></a>
                            <a className="button buttonAbstain" name="Hold" onClick={() => {
                                this.props.setDialogConfig({
                                    acceptedAction: () => { this.resolutionButtonHandler("Hold") }, message: "Hello"
                                })
                            }}><span><FontAwesomeIcon icon={faHandPaper}></FontAwesomeIcon></span></a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}