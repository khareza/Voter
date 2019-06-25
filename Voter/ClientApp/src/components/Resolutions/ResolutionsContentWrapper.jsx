import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CreateResolution from './ActionForms/CreateResolution';
import CreateResolutionGroup from './ActionForms/CreateResolutionGroup';
import EditResolution from './ActionForms/EditResolution';
import ResolutionResults from './ResolutionResults';
import ResolutionsGroupList from './ResolutionsGroupList';
import { ResolutionMethods } from '../../Helpers/ResolutionMethods';
import AuthMethods from '../../Helpers/AuthMethods';
import { NotificationManager } from 'react-notifications';
import UserVotesList from './UserVotesList';
import Dialog from '../DialogBoxes/DialogBox';
import DialogBackdrop from '../DialogBoxes/DialogBackdrop';
import ResolutionPrinter from './ResolutionPrinter'

export class ResolutionsContentWrapper extends Component {

    constructor(props) {
        super(props);
        this.ResMethods = new ResolutionMethods();
        this.Auth = new AuthMethods();
        this.state = {
            resolutions: '',
            isContentLoaded: false,
            dialogOpen: false,
            dialogConfig: {}
        }
    }

    componentDidMount() {
        this.getResolutions();
    }

    getResolutions = () => {
        this.setState({ isContentLoaded: false });
        if (this.Auth.isUserAdmin()) {
            this.ResMethods.getGroupedActiveResolutions()
                .then(res => {
                    this.setState({
                        resolutions: res.data,
                        isContentLoaded: true
                    });
                });
        }
        else {
            this.ResMethods.getGroupedResolutionsWithoutUserVote()
                .then(res => {
                    this.setState({
                        resolutions: res.data,
                        isContentLoaded: true
                    });
                });
        }
    }

    deleteResolution = (id) => {
        this.ResMethods.deleteResolution(id)
            .then((res) => {
                this.getResolutions();
                NotificationManager.success('Delete Successful', 'Correct');
            }).catch(err => {
                NotificationManager.error('Unsuccessful delete', 'Error!');
            });
    }

    deleteResolutionFromList = (id) => {
        this.getResolutions();
    }

    editResolution = (id) => {
        this.props.history.push(`/Resolutions/edit/${id}`)
    }

    setEditedResolution = (id, updatedResolution) => {
        let resolutionsList = this.state.resolutions;
        const parsedId = parseInt(id, 10);

        resolutionsList.forEach((resolutions, index1) => {
            resolutions.forEach((resolution, index2) => {
                if (resolution.id === parsedId) {
                    resolutionsList[index1][index2] = updatedResolution;
                }
            })
        })

        this.setState({ resolutions: resolutionsList });
    }

    addNewResolution = () => {
        this.getResolutions();
    }

    showResolutionResults = (id) => {
        this.props.history.push(`/Resolutions/results/${id}`)
    }

    setDialogConfig = (config) => {
        this.setState({ dialogOpen: true, dialogConfig: config });
    }

    handleDialogOpen = () => {
        this.setState({
            dialogOpen: true,
        });
    }

    handleAccept = () => {
        this.state.dialogConfig.acceptedAction();
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

    handleShowVoters = (id) => {
        this.props.history.push(`/resolutions/results/${id}/votes`);
    }

    handleBackPageFromVoter = (id) => {
        this.props.history.push(`/resolutions/results/${id}`);
    }

    handleBackPage = () => {
        this.props.history.push(`/resolutions/`);
    }

    render() {
        return (
            <div className="listBody">
                {this.state.dialogOpen ? <DialogBackdrop /> : null}
                <Dialog dialogOpen={this.state.dialogOpen}
                    closeDialog={this.handleCloseDialog}
                    refuse={this.handleRefuse}
                    agree={this.handleAccept}
                    message={this.state.dialogConfig.message}
                />
                <div className="listBody">

                    {this.state.isContentLoaded ?
                        <div>
                            <Route exact path="/resolutions" render={() => (
                                <ResolutionsGroupList
                                    deleteResolution={this.deleteResolution}
                                    deleteResolutionFromList={this.deleteResolutionFromList}
                                    showResolutionResults={this.showResolutionResults}
                                    editResolution={this.editResolution}
                                    resolutionsGroups={this.state.resolutions}
                                    isContentLoaded={this.state.isContentLoaded}
                                    setDialogConfig={this.setDialogConfig}
                                />)} />

                            <Route exact path="/resolutions/create" render={() => (
                                <CreateResolutionGroup
                                    addNewResolution={this.addNewResolution} />)} />

                            <Route exact path="/resolutions/edit/:resolution_id" render={() => (
                                <EditResolution
                                    setDialogConfig={this.setDialogConfig}
                                    setEditedResolution={this.setEditedResolution} />)} />

                            {this.Auth.isUserAdmin()
                                ? <Route exac path="/resolutions/print/:group_id" render={() => (
                                    <ResolutionPrinter resolutions={this.state.resolutions} />)} />
                                : null}

                            <Route exact path="/resolutions/results/:resolution_id" render={() => (
                                <ResolutionResults
                                    handleShowVoters={this.handleShowVoters}
                                    handleBackPage={this.handleBackPage} />)} />

                            <Route exact path="/resolutions/results/:resolution_id/votes" render={() => (
                                <UserVotesList
                                    handleBackPage={this.handleBackPageFromVoter} />)} />

                        </div>
                        : null}
                </div>
            </div>
        );
    }
}