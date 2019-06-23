import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ResolutionsList from './ResolutionsList';
import Moment from 'react-moment';

class ResolutionsGroup extends Component {


    editResolution = (id) => {
        console.log(id);
        var index = this.state.resolutions.findIndex((resolution) => (resolution.id === id))
        this.props.history.push(`/Resolutions/edit/${index}`)
    }

    getResolutionToEdit = (index) => {
        console.log(this.state.resolutions[index]);
        return this.state.resolutions[index];
    }

    setEditedResolution = (index, updatedResolution) => {
        let resolutions = this.state.resolutions;
        resolutions[index] = updatedResolution;
        this.setState({ resolutions });
    }

    render() {
        return (
            <div className="listBody">
                <div className="resolutionGroupContainer">
                    <div className="resolutionGroup">
                        <div className="resolutionGroupText">
                            <p>Resolutions from <Moment format="DD.MM.YYYY">{this.props.resolutions[0].creationDate}</Moment></p>
                        </div>
                    </div>
                </div>
                <ResolutionsList
                    setDialogConfig={this.props.setDialogConfig}
                    showResolutionResults={this.props.showResolutionResults}

                    resolutions={this.props.resolutions}
                    deleteResolution={this.props.deleteResolution}
                    deleteResolutionFromList={this.props.deleteResolutionFromList}

                    editResolution={this.props.editResolution} />
            </div>
        );
    }
}

export default withRouter(ResolutionsGroup);