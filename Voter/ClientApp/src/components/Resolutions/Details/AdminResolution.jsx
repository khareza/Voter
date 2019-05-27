import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faFolderMinus } from '@fortawesome/free-solid-svg-icons'

export class AdminResolution extends Component {

    editResolution = () => {
        this.props.editResolution(this.props.resolution);
    }

    deleteResolution = () => {
        this.props.deleteResolution(this.props.resolution.id);
    }

    render() {

        return (
            <div className="userCard">
                <div className="userCardHeader">
                    <p>{`${this.props.resolution.title}`}</p>
                    <p>Expiration Date: {this.props.resolution.expirationDate}</p>
                </div>
                <div className="userData">
                    <div>
                        <p><span>{this.props.resolution.resolutionNumber}</span> {this.props.resolution.description}</p>
                    </div>
                    <div className="userButtons">
                        <a className="button buttonEdit" onClick={this.editResolution}><FontAwesomeIcon icon={faEdit}></FontAwesomeIcon></a>
                        <a className="button buttonDelete" onClick={this.deleteResolution}><FontAwesomeIcon icon={faFolderMinus}></FontAwesomeIcon></a>
                    </div>
                </div>
            </div>
        );
    }
}