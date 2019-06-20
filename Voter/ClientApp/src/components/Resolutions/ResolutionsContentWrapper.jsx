import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CreateResolution from './ActionForms/CreateResolution';
import ResolutionsList from './ResolutionsList';
import EditResolution from './ActionForms/EditResolution';
import ResolutionResults from './ResolutionResults';
import { ResolutionMethods } from '../../Helpers/ResolutionMethods';
import AuthMethods from '../../Helpers/AuthMethods';
import { NotificationManager } from 'react-notifications';
import UserVotesList from './UserVotesList';


export class ResolutionsContentWrapper extends Component {

    constructor(props) {
        super(props);
        this.ResMethods = new ResolutionMethods();
        this.Auth = new AuthMethods();
        this.state = {
            resolutions: [],
            isContentLoaded: false
        }
    }

    componentDidMount() {
        this.getResolutions();
    }

    getResolutions = () => {
        this.setState({isContentLoaded:false});
        if (this.Auth.isUserAdmin()) {
            this.ResMethods.getActiveResolutions()
                .then(res => {
                    this.setState({
                        resolutions: res.data,
                        isContentLoaded: true
                    });

                });
        }
        else {
            this.ResMethods.getResolutionsWithoutUserVote()
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
            .then(() => {
                var newList = this.state.resolutions.filter((resolution) => (resolution.id !== id));
                this.setState({ resolutions: newList });
                NotificationManager.success('Delete Successful', 'Correct');
            })
            .catch(err => {
                NotificationManager.error('Unsuccessful delete', 'Error!');
            });
    }

    deleteResolutionFromList = (id) => {
        var newList = this.state.resolutions.filter((resolution) => (resolution.id !== id));
        this.setState({ resolutions: newList });
    }

    showResolutionResults = (id) => {
        this.props.history.push(`/Resolutions/results/${id}`)
    }

    editResolution = (id) => {
        var index = this.state.resolutions.findIndex((resolution) => (resolution.id === id))
        this.props.history.push(`/Resolutions/edit/${index}`)
    }

    getResolutionToEdit = (index) => {
        return this.state.resolutions[index];
    }

    setEditedResolution = (index, updatedResolution) => {
        let resolutions = this.state.resolutions;
        resolutions[index] = updatedResolution;
        this.setState({ resolutions });
    }

    addNewResolution = (newResolution) => {
        let resolutions = this.state.resolutions;
        resolutions.push(newResolution);
        this.setState({ resolutions });
    }

    render() {
        return (
            <div className="listBody">
                
                {this.state.resolutions ?
                    <div>
                        <Route exact path="/resolutions" render={() => (
                            <ResolutionsList
                                isContentLoaded={this.state.isContentLoaded}
                                editResolution={this.editResolution}
                                resolutions={this.state.resolutions}
                                deleteResolution={this.deleteResolution}
                                deleteResolutionFromList={this.deleteResolutionFromList}
                                showResolutionResults={this.showResolutionResults}/>)} />
                        <Route exact path="/resolutions/results/:resolution_id" component={ResolutionResults} />
                        <Route exact path="/resolutions/results/:resolution_id/votes" component={UserVotesList} />
                        <Route exact path="/resolutions/create" render={() => (
                            <CreateResolution
                                addNewResolution={this.addNewResolution} />)} />

                        <Route exact path="/resolutions/edit/:resolution_id" render={() => (
                            <EditResolution
                                getResolutionToEdit={this.getResolutionToEdit}
                                setEditedResolution={this.setEditedResolution} />)} />
                    </div>
                    : null}
            </div>
        );
    }
}