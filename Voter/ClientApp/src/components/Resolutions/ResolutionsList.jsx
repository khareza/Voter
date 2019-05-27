import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import { ResolutionDetails } from './Details/ResolutionDetails';
import AuthMethods from '../../Helpers/AuthMethods';

class ResolutionsList extends Component {
    Auth = new AuthMethods();
    constructor(props) {
        super(props);
        this.state = {
            resolutions: []
        }
    }

    componentDidMount() {
        this.getResolutions();
    }

    getResolutions = () => {
        this.Auth.getResolutions()
            .then(res => {
                this.setState({ resolutions: res.data })
            });
    }

    deleteResolution = (id) => {
        this.Auth.deleteResolution(id)
            .then(() => {
                this.getResolutions();
                NotificationManager.success('Delete Successful', 'Correct');
            })
            .catch(err => {
                NotificationManager.error('Unsuccessful delete', 'Error!', 5000, () => {
                });
            });
    }

    renderResolutionComponents = () => {
        return this.state.resolutions.map((resolution) => {
            return (
                <ResolutionDetails key={resolution.id}
                    deleteResolution={this.deleteResolution}
                    editResolution={
                        (resolutionToEdit) => {
                            this.props.editResolution(resolutionToEdit)
                        }}
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
                {this.renderResolutionComponents()}
                <div className="text-center">
                    <button className="btn btn-success mt-3"
                        onClick={() => { this.props.history.push('/resolutions/create') }}>Add new resolution</button>
                </div>
            </div>
        );
    }
}

export default withRouter(ResolutionsList);