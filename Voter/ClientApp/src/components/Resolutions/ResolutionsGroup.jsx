import React, { Component } from 'react';
import { Route } from 'react-router-dom';
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
                {this.props.resolutions.length > 0 ?
                    <div>
                        <div className="resolutionGroupContainer">
                            <div className="resolutionGroup">
                                <div className="resolutionGroupText">
                                    <p>Resolutions from <Moment format="DD.MM.YYYY">{this.props.resolutions[0].creationDate}</Moment></p>
                                </div>
                            </div>
                        </div>
                        <Route exact path="/resolutions" render={() => (
                            <ResolutionsList
                                setDialogConfig={this.props.setDialogConfig}
                                showResolutionResults={this.props.showResolutionResults}

                                resolutions={this.props.resolutions}
                                deleteResolution={this.props.deleteResolution}

                                editResolution={this.props.editResolution}
                            />)} />
                    </div>
                    : null}
            </div>
        );
    }
}

export default withRouter(ResolutionsGroup);