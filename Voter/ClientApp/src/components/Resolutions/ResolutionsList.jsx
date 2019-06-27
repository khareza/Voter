import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import  AdminResolution  from './Details/AdminResolution';
import  UserResolution  from './Details/UserResolution';
import AuthMethods from '../../Helpers/AuthMethods';

class ResolutionsList extends Component {

    Auth = new AuthMethods();

    renderAdminResolutionComponents = () => {
        return this.props.resolutions.map((resolution) => {
            return (
                <AdminResolution key={resolution.id}
                    setDialogConfig={this.props.setDialogConfig}
                    resolution={resolution}
                    showResolutionResults={this.props.showResolutionResults}
                    deleteResolution={this.props.deleteResolution}

                    editResolution={this.props.editResolution}
                />
            )
        })
    }

    renderUserResolutionComponents = () => {
        return this.props.resolutions.map((resolution) => {
            return (
                <UserResolution key={resolution.id}
                    setDialogConfig={this.props.setDialogConfig}
                    deleteResolutionFromList={this.props.deleteResolutionFromList}
                    resolution={resolution} />
            )
        })
    }

    render() {
        return (
            <div>
                {this.Auth.isUserAdmin()
                    ? this.renderAdminResolutionComponents()
                    : this.renderUserResolutionComponents()}
            </div>
        );
    }
}

export default withRouter(ResolutionsList);