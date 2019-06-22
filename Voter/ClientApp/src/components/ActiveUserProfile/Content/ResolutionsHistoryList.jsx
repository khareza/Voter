import React, { Component } from 'react';
import { ResolutionMethods } from '../../../Helpers/ResolutionMethods';
import AuthMethods from '../../../Helpers/AuthMethods';
import UserResolutionHistory from './Details/UserResolutionHistory';
import AdminResolutionHistory from './Details/AdminResolutionHistory';


export default class ResolutionsHistoryList extends Component {

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
        this.setState({ isContentLoaded: false });
        if (this.Auth.isUserAdmin()) {
            this.ResMethods.getExpiredResolutions()
                .then(res => {
                    this.setState({
                        resolutions: res.data,
                        isContentLoaded: true
                    });
                });
        }
        else {
            this.ResMethods.getExpiredResolutionsWithUserVote()
                .then(res => {
                    this.setState({
                        resolutions: res.data,
                        isContentLoaded: true
                    });
                });
        }
    }

    renderAdminComponents = () => {
        return <div>
            {this.state.resolutions.map((resolution, index) => (<AdminResolutionHistory key={index} resolution={resolution} />))}
        </div>;

    }
    renderUserComponents = () => {
        return <div>
            {this.state.resolutions.map((resolution, index) => (<UserResolutionHistory key={index} resolution={resolution}/> ))}

        </div>;
    }



    render() {
        return (
            <div className="profileWrapper">
                {this.state.isContentLoaded ?
                    <div>
                        {this.Auth.isUserAdmin() ? this.renderAdminComponents() : this.renderUserComponents()}
                    </div>
                    : <div className="spinner"></div>}
            </div>
        );
    }

}