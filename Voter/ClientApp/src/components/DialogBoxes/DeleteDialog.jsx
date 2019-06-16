import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

export default class DeleteDialog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isDialogOpen: this.props.dialogErrorOpen
        }
    }

    handleDialogClose = () => {
        this.props.closeDialog();
    }

    handleAgree = () => {
        if (this.props.agree) {
            this.props.agree();
        }
        this.setState({
            isDialogOpen: false
        });
    }

    handleRefuse = () => {
        if (this.props.refuse) {
            this.props.refuse();
        }
        this.setState({
            isDialogOpen: false
        });
    }

    render() {
        let dialogClass = 'dialogContainer';
        if (this.props.dialogErrorOpen) {
            dialogClass = 'dialogContainer open'
        }

        return (
            <div className={dialogClass}>
                <div>
                    <a className="button buttonDialogClose" onClick={this.handleDialogClose}><FontAwesomeIcon icon={faTimes}></FontAwesomeIcon></a>
                </div>
                <div className="dialogMessage">
                    <p>{this.props.message}</p>
                </div>
                <div className="dialogButtons">
                    <a className="dialogButton buttonDialogAccept" onClick={this.handleAgree}>Yes</a>
                    <a className="dialogButton buttonDialogRefuse" onClick={this.handleRefuse}>No</a>
                </div>
            </div>
        );
    }
}