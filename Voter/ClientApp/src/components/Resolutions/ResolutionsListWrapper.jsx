import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { CreateResolution } from './ActionForms/CreateResolution';
import ResolutionsList from './ResolutionsList';
import EditResolution from './ActionForms/EditResolution';
import { ResolutionMethods } from '../../Helpers/ResolutionMethods';
import AuthMethods from '../../Helpers/AuthMethods';
import { NotificationManager } from 'react-notifications';

export class ResolutionsListWrapper extends Component {

    constructor(props) {
        super(props);
        this.ResMethods = new ResolutionMethods();
        this.Auth = new AuthMethods();
        this.state = {
            resolutions: ''
        }
    }

    componentDidMount() {
        this.getResolutions();
    }

    getResolutions = () => {
        this.ResMethods.getResolutions()
            .then(res => {
                this.setState({ resolutions: res.data });
            });
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

    editResolution = (id) => {
        var index = this.state.resolutions.findIndex((resolution) => (resolution.id === id))
        this.props.history.push(`/Resolutions/edit/${index}`)
    }

    getResolutionToEdit = (index) => {
        return this.state.resolutions[index];
    }

    render() {
        return (
            <div>
                {this.state.resolutions ?
                    <div>
                        <Route exact path="/resolutions" render={() =>
                            (<ResolutionsList
                                editResolution={this.editResolution}
                                resolutions={this.state.resolutions}
                                deleteResolution={this.deleteResolution} />)} />
                        <Route exact path="/resolutions/create" component={CreateResolution} />
                        <Route exact path="/resolutions/edit/:resolution_id" render={() => (<EditResolution getResolutionToEdit={this.getResolutionToEdit} />)} />
                    </div>
                    : null}
            </div>
        );
    }
}