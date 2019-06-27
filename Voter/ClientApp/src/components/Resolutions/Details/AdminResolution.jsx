import React, { Component } from 'react';
import Moment from 'react-moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faFolderMinus, faPoll } from '@fortawesome/free-solid-svg-icons'

export default class AdminResolution extends Component {

    editResolution = () => {
        this.props.editResolution(this.props.resolution.id);
    }

    deleteResolution = () => {
        this.props.setDialogConfig({
            acceptedAction: () => { this.props.deleteResolution(this.props.resolution.id) }, message: "Delete"
        })
    }

    showResolutionResults = () => {
        this.props.showResolutionResults(this.props.resolution.id);
    }

    render() {

        return (
            <div className="resolutionCard">
                <div className="resolutionCardHeader">
                    <h4 className="resolutionTitle">{`${this.props.resolution.title}`}</h4>
                    <p>Expiration Date: <Moment format="dddd YYYY-MM-DD HH:mm">{this.props.resolution.expirationDate}</Moment></p>
                    <p>Voting ends <Moment fromNow="dddd YYYY-MM-DD HH:mm">{this.props.resolution.expirationDate}</Moment></p>
                </div>
                <div className="resolutionData">
                    <div>
                        <p><span>Resolution No. {this.props.resolution.resolutionNumber}</span> {this.props.resolution.description}</p>
                    </div>
                    <div className="resolutionButtons">
                        <a className="button buttonEdit" onClick={this.editResolution}><FontAwesomeIcon icon={faEdit}></FontAwesomeIcon></a>
                        <a className="button buttonShowResults" onClick={this.showResolutionResults}><FontAwesomeIcon icon={faPoll}></FontAwesomeIcon></a>
                        <a className="button buttonDelete" onClick={this.deleteResolution}><FontAwesomeIcon icon={faFolderMinus}></FontAwesomeIcon></a>
                    </div>
                </div>
            </div>
        );
    }
}