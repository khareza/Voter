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
            resolutions: this.props.resolutions
        }
    }

    renderAdminResolutionComponents = () => {
        return this.state.resolutions.map((resolution) => {
            return (
                <AdminResolution key={resolution.id}
                    deleteResolution={this.deleteResolution}
                    editResolution={
                        (id) => {
                            this.props.editResolution(id)
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

    renderButton = () => {

       return ( <div className="text-center">
            <button className="btn btn-success mt-3"
                onClick={() => { this.props.history.push('/resolutions/create') }}>Add new resolution</button>
        </div>)
    }
    //change it to check only once
    render() {
        return (
            <div>
                <div className="headerLogin">
                    <h2>Resolutions</h2>
                </div>
                {this.Auth.isUserAdmin() ? this.renderAdminResolutionComponents() : this.renderUserResolutionComponents()}
                {this.Auth.isUserAdmin() ? this.renderButton() : null}
            </div>
        );
    }
}

export default withRouter(ResolutionsList);



    //renderAdminResolutionComponents = (resolutionsByDates) => {
    //    console.log(resolutionsByDates);
    //    for (var key in resolutionsByDates) {
    //        console.log(resolutionsByDates[key]);
    //        var result = <div key={resolutions.id} className="listBody">
    //            {resolutionsByDates[key].map((resolutions) => {
    //                return (
    //                    <p>Resolutions of <Moment format="YYYY-MM-DD">{resolutions.creationDate}</Moment></p>
    //                    <UserResolution key={resolutions.id}
    //                        resolution={resolutions} />
    //            )
    //            })}</div>
    //    }
    //    return result;
    //}

    //filterResults = () => {
    //    var resolutionsByDates = this.state.resolutions.reduce((catsSoFar, resolution) => {
    //        if (!catsSoFar[resolution.creationDate]) catsSoFar[resolution.creationDate] = [];
    //        catsSoFar[resolution.creationDate].push(resolution);
    //        return catsSoFar;
    //    }, {});
    //    this.setState({ resolutionsByDates });
    //}