import React, { Component } from 'react';
import Moment from 'react-moment';
import { NotificationManager } from 'react-notifications';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faBan, faHandPaper } from '@fortawesome/free-solid-svg-icons'
import { UserMethods } from '../../../Helpers/UserMethods';
import AuthMethods from '../../../Helpers/AuthMethods';
import Dialog from '../../DialogBoxes/DialogBox';
import DialogBackdrop from '../../DialogBoxes/DialogBackdrop';

export class UserResolution extends Component {

    userRequest = new UserMethods();
    authRequest = new AuthMethods();

    constructor(props) {
        super(props);
        this.state = {
            vote: '',
            dialogOpen: false
        }
    }

    resolutionButtonHandler = () => {
        const voterId = this.authRequest.getUserId();
        const resolutionId = this.props.resolution.id;

        this.userRequest.sendVote({ voterId, resolutionId, vote: this.state.vote })
            .then(() => {
                this.props.deleteResolutionFromList(resolutionId);
                NotificationManager.success('Vote sent', 'Correct');
            })
            .catch((err) => {
                NotificationManager.success('Incorrect action', 'Error');
            });
    }

    handleDialogOpen = (event) => {
        const vote = event.target.name;
        this.setState({
            dialogOpen: true,
            vote
        });
    }

    handleAccept = () => {
        this.resolutionButtonHandler();
        this.setState({
            dialogOpen: false
        });
    }

    handleRefuse = () => {
        this.setState({
            dialogOpen: false
        });
    }

    handleCloseDialog = () => {
        this.setState({
            dialogOpen: false
        });
    }

    render() {
        return (
            <div>
                {this.state.dialogOpen ? <DialogBackdrop /> : null}
                <Dialog dialogOpen={this.state.dialogOpen}
                    closeDialog={this.handleCloseDialog}
                    refuse={this.handleRefuse}
                    agree={this.handleAccept}
                    message="Are you sure you want to edit this resolution?"
                />
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
                            <a className="button buttonAccept" name="For" onClick={this.handleDialogOpen}><span><FontAwesomeIcon icon={faCheck}></FontAwesomeIcon></span></a>
                            <a className="button buttonAgainst" name="Against" onClick={this.handleDialogOpen}><span><FontAwesomeIcon icon={faBan}></FontAwesomeIcon></span></a>
                            <a className="button buttonAbstain" name="Hold" onClick={this.handleDialogOpen}><span><FontAwesomeIcon icon={faHandPaper}></FontAwesomeIcon></span></a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}