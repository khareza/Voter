import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { CreateResolution } from './ActionForms/CreateResolution';
import ResolutionsList from './ResolutionsList';
import EditResolution from './ActionForms/EditResolution';
import AuthMethods from '../../Helpers/AuthMethods';

export class ResolutionsListWrapper extends Component {

    Auth = new AuthMethods();
    state = {
        resolutionToEdit: {}
    }

    editResolution = (resolutionToEdit) => {
        this.setState({
            resolutionToEdit
        });
        this.props.history.push('/Resolutions/edit')
    }

    render() {
        return (
            <div>
                <Route exact path="/resolutions" render={() => (<ResolutionsList editResolution={this.editResolution} />)} />
                <Route exact path="/resolutions/create" component={CreateResolution} />
                <Route exact path="/resolutions/edit" render={() => (<EditResolution resolutionToEdit={this.state.resolutionToEdit} />)} />
            </div>
        );
    }
}