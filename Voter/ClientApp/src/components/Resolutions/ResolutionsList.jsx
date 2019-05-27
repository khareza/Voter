import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import { AdminResolution } from './Details/AdminResolution';
import { UserResolution } from './Details/UserResolution';
import { ResolutionMethods} from '../../Helpers/ResolutionMethods';
import AuthMethods from '../../Helpers/AuthMethods';

class ResolutionsList extends Component {
    constructor(props) {
        super(props);
        this.ResMethods = new ResolutionMethods();
        this.Auth = new AuthMethods();
        this.state = {
            resolutions: []
        }
    }

    componentDidMount() {
        this.getResolutions();
    }

    getResolutions = () => {
        this.ResMethods.getResolutions()
            .then(res => {
                this.setState({ resolutions: res.data })
            });
    }

    deleteResolution = (id) => {
        this.ResMethods.deleteResolution(id)
            .then(() => {
                this.getResolutions();
                NotificationManager.success('Delete Successful', 'Correct');
            })
            .catch(err => {
                NotificationManager.error('Unsuccessful delete', 'Error!', 5000, () => {
                });
            });
    }

    renderAdminResolutionComponents = () => {
        return this.state.resolutions.map((resolution) => {
            return (
                <AdminResolution key={resolution.id}
                    deleteResolution={this.deleteResolution}
                    editResolution={
                        (resolutionToEdit) => {
                            this.props.editResolution(resolutionToEdit)
                        }}
                    resolution={resolution} />
            )
        })
    }

    renderUserResolutionComponents = () => {
        return this.state.resolutions.map((resolution) => {
            return (
                <UserResolution key={resolution.id}
                    resolution={resolution} />
            )
        })
    }

    render() {
        return (
            <div>
                <div className="headerLogin">
                    <h2>All resolution</h2>
                </div>
                {this.Auth.isUserAdmin() ? this.renderAdminResolutionComponents() : this.renderUserResolutionComponents() }
                <div className="text-center">
                    <button className="btn btn-success mt-3"
                        onClick={() => { this.props.history.push('/resolutions/create') }}>Add new resolution</button>
                </div>
            </div>
        );
    }
}

export default withRouter(ResolutionsList);