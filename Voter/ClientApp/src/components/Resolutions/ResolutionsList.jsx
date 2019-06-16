import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { AdminResolution } from './Details/AdminResolution';
import { UserResolution } from './Details/UserResolution';
import { ResolutionMethods } from '../../Helpers/ResolutionMethods';
import AuthMethods from '../../Helpers/AuthMethods';
import DeleteDialog from '../DialogBoxes/DeleteDialog';
import DialogBackdrop from '../DialogBoxes/DialogBackdrop';

class ResolutionsList extends Component {

    ResMethods = new ResolutionMethods();
    Auth = new AuthMethods();

    constructor(props) {
        super(props);
        this.state = {
            dialogErrorOpen: false,
            deleteResolutionId: ''
        }
    }

    renderAdminResolutionComponents = () => {
        return this.props.resolutions.map((resolution) => {
            return (
                <AdminResolution key={resolution.id}
                    deleteResolution={this.handleErrorDialogOpen}
                    editResolution={
                        (id) => {
                            this.props.editResolution(id)
                        }}
                    resolution={resolution}
                    showResolutionResults={this.props.showResolutionResults}/>
            )
        })
    }

    renderUserResolutionComponents = () => {
        return this.props.resolutions.map((resolution) => {
            return (
                <UserResolution key={resolution.id}
                    resolution={resolution}
                    deleteResolutionFromList={this.props.deleteResolutionFromList}/>
            )
        })
    }

    renderButton = () => {

        return (<div className="text-center">
            <button className="btn btn-success"
                onClick={() => { this.props.history.push('/resolutions/create') }}>Add new resolution</button>
        </div>)
    }

    handleErrorDialogOpen = (id) => {
        this.setState({
            dialogErrorOpen: true,
            deleteResolutionId: id
        });
    }

    handleAccept = () => {
        this.props.deleteResolution(this.state.deleteResolutionId)
        this.setState({
            dialogErrorOpen: false,
            deleteResolutionId: ''
        });
    }

    handleRefuse = () => {
        this.setState({
            dialogErrorOpen: false,
            deleteResolutionId: ''
        });
    }

    handleCloseDialog = () => {
        this.setState({
            dialogErrorOpen: false,
            deleteResolutionId: ''
        });
    }

    //change it to check only once
    render() {
        return (
            <div>
                {this.state.dialogErrorOpen ? <DialogBackdrop /> : null}
                <DeleteDialog dialogErrorOpen={this.state.dialogErrorOpen}
                    closeDialog={this.handleCloseDialog}
                    refuse={this.handleRefuse}
                    agree={this.handleAccept}
                    message="Are you sure you want to delete this resolution?"
                />
                <div className="listHeader">
                    <h2>Resolutions</h2>
                </div>
                {this.Auth.isUserAdmin() ? this.renderButton() : null}
                {this.Auth.isUserAdmin() ? this.renderAdminResolutionComponents() : this.renderUserResolutionComponents()}
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