import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { AdminResolution } from './Details/AdminResolution';
import { UserResolution } from './Details/UserResolution';
import { ResolutionMethods } from '../../Helpers/ResolutionMethods';
import AuthMethods from '../../Helpers/AuthMethods';
import Dialog from '../DialogBoxes/DialogBox';
import DialogBackdrop from '../DialogBoxes/DialogBackdrop';

class ResolutionsList extends Component {

    ResMethods = new ResolutionMethods();
    Auth = new AuthMethods();

    constructor(props) {
        super(props);
        this.state = {
            dialogOpen: false,
            deleteResolutionId: ''
        }
    }

    renderAdminResolutionComponents = () => {
        return this.props.resolutions.map((resolution) => {
            return (
                <AdminResolution key={resolution.id}
                    deleteResolution={this.handleDialogOpen}
                    editResolution={this.props.editResolution}
                    resolution={resolution}
                    showResolutionResults={this.props.showResolutionResults}/>
            )
        })
    }

    renderUserResolutionComponents = () => {
        return this.props.resolutions.map((resolution) => {
            return (
                <UserResolution key={resolution.id}
                    resolution={resolution}
                    deleteResolutionFromList={this.props.deleteResolutionFromList}/>
            )
        })
    }

    renderButton = () => {

        return (<div className="text-center">
            <button className="btn btn-success"
                onClick={() => { this.props.history.push('/resolutions/create') }}>Add new resolution</button>
        </div>)
    }

    handleDialogOpen = (id) => {
        this.setState({
            dialogOpen: true,
            deleteResolutionId: id
        });
    }

    handleAccept = () => {
        this.props.deleteResolution(this.state.deleteResolutionId)
        this.setState({
            dialogOpen: false,
            deleteResolutionId: ''
        });
    }

    handleRefuse = () => {
        this.setState({
            dialogOpen: false,
            deleteResolutionId: ''
        });
    }

    handleCloseDialog = () => {
        this.setState({
            dialogOpen: false,
            deleteResolutionId: ''
        });
    }

    //change it to check if admin only once
    render() {
        return (
            <div>
                {this.state.dialogOpen ? <DialogBackdrop /> : null}
                <Dialog dialogOpen={this.state.dialogOpen}
                    closeDialog={this.handleCloseDialog}
                    refuse={this.handleRefuse}
                    agree={this.handleAccept}
                    message="Are you sure you want to delete this resolution?"
                />
                <div className="listHeader">
                    <h2>Resolutions</h2>
                </div>
                {this.Auth.isUserAdmin() ? this.renderButton() : null}
                {this.props.isContentLoaded ? 
                    <div>
                        {this.Auth.isUserAdmin()
                            ? this.renderAdminResolutionComponents()
                            : this.renderUserResolutionComponents()}
                    </div>
                    : <div className="spinner"></div>}
            </div>
        );
    }
}

export default withRouter(ResolutionsList);