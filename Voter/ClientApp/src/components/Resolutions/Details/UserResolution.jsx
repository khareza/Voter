import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faBan, faHandPaper} from '@fortawesome/free-solid-svg-icons'

export class UserResolution extends Component {

    render() {

        return (
            <div className="resolutionCard">
                <div className="resolutionCardHeader">
                    <p>{`${this.props.resolution.title}`}</p>
                    <p>Expiration Date: {this.props.resolution.expirationDate}</p>
                </div>
                <div className="resolutionData">
                    <div>
                        <p><span>Resolution No. {this.props.resolution.resolutionNumber}</span> {this.props.resolution.description}</p>
                    </div>
                    <div className="resolutionButtons">
                        <a className="button buttonAccept" ><FontAwesomeIcon icon={faCheck}></FontAwesomeIcon></a>
                        <a className="button buttonAgainst" ><FontAwesomeIcon icon={faBan}></FontAwesomeIcon></a>
                        <a className="button buttonAbstain" ><FontAwesomeIcon icon={faHandPaper}></FontAwesomeIcon></a>
                    </div>
                </div>
            </div>
        );
    }
}