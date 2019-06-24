import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { ResolutionMethods } from '../../Helpers/ResolutionMethods';
import ResolutionsGroup from './ResolutionsGroup';
import AuthMethods from '../../Helpers/AuthMethods';


class ResolutionsGroupList extends Component {

    ResMethods = new ResolutionMethods();
    Auth = new AuthMethods();

    constructor(props) {
        super(props);
        this.state = {
            resolutionsGroups: props.resolutions
        }
    }
    renderButton = () => {

        return (<div className="text-center">
            <button className="btn btn-success my-3"
                onClick={() => { this.props.history.push('/resolutions/create') }}>Add new resolution</button>
        </div>)
    }

    render() {
        return (
            <div>
                {this.Auth.isUserAdmin() ? this.renderButton() : null}
                {this.props.isContentLoaded ?
                    <div>
                        {this.props.resolutionsGroups.map((resolutions, index) => (
                            <ResolutionsGroup key={index}
                                groupIndex={index}
                                deleteResolution={this.props.deleteResolution}
                                deleteResolutionFromList={this.props.deleteResolutionFromList}
                                editResolution={this.props.editResolution}
                                showResolutionResults={this.props.showResolutionResults}
                                resolutions={resolutions}
                                setDialogConfig={this.props.setDialogConfig}
                                isContentLoaded={this.props.isContentLoaded} />
                        ))}
                        {this.props.resolutionsGroups.length ===0 ?<h3>No avaiable resolutions</h3>:null }
                    </div>
                    : <div className="spinner"></div>}
            </div>
        );
    }
}

export default withRouter(ResolutionsGroupList);