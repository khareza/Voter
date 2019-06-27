import React, { Component } from 'react';
import ResolutionMethods from '../../../Helpers/ResolutionMethods';
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
            isContentLoaded: false,
            filteredList: []
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
                        filteredList: res.data,
                        isContentLoaded: true
                    });
                });
        }
        else {
            this.ResMethods.getExpiredResolutionsWithUserVote()
                .then(res => {
                    this.setState({
                        resolutions: res.data,
                        filteredList: res.data,
                        isContentLoaded: true
                    });
                });
        }
    }

    openDetails = (id) => {
        this.props.history.push(`/profile/resolution_history/${id}`);
    }

    renderComponents = () => {
        return <div>
            {this.state.filteredList.map((resolution, index) => (
                this.Auth.isUserAdmin()
                    ? <AdminResolutionHistory key={index} resolution={resolution} openDetails={this.openDetails} />
                    : <UserResolutionHistory key={index} resolution={resolution} />
            ))}
        </div>;
    }

    filterResolutionList = (e) => {
        let filteredList = this.state.resolutions;
        if (e.target.name !== 'All') {
            if (this.Auth.isUserAdmin()) {
                filteredList = this.state.resolutions.filter((resolution) => {
                    return resolution.resolutionStatus === e.target.name
                });
            }
            else {
                filteredList = this.state.resolutions.filter((resolution) => {
                    return resolution.resolution.resolutionStatus === e.target.name

                });
            }
        }
        this.setState({ filteredList });
    }

    render() {
        return (
            <div className="profileWrapper">
                <div className="filterButtonsHeader">
                    <h4>Filter by resolution result</h4>
                </div>
                <div className="filterButtons">
                    <button className="btn btn-warning" onClick={this.filterResolutionList} name='All'>All</button>
                    <button className="btn btn-primary" onClick={this.filterResolutionList} name='Active'>Active</button>
                    <button className="btn btn-success" onClick={this.filterResolutionList} name='Accepted'>Accepted</button>
                    <button className="btn btn-danger" onClick={this.filterResolutionList} name='Rejected'>Rejected</button>
                </div>
                {this.state.isContentLoaded
                    ? <div>
                        {this.renderComponents()}
                    </div>
                    : <div className="spinner"></div>}
            </div>
        );
    }

}