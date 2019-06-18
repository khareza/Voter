import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { UserDetails } from './Details/UserDetails';
import { UserMethods } from '../../Helpers/UserMethods';
import Dialog from '../DialogBoxes/DialogBox';
import DialogBackdrop from '../DialogBoxes/DialogBackdrop';

class UsersList extends Component {
    UserMethods = new UserMethods();

    constructor(props) {
        super(props);
        this.state = {
            dialogOpen: false,
            deleteUserId: ''
        }
    }

    renderUserComponents = () => {
        return this.props.users.map((user) => {
            return (
                <UserDetails key={user.id}
                    handleDialogOpen={this.handleDialogOpen}
                    editUser={
                        (id) => {
                            this.props.editUser(id)
                        }}
                    user={user} />
            )
        })
    }

    handleDialogOpen = (id) => {
        this.setState({
            dialogOpen: true,
            deleteUserId: id
        });
    }

    handleAccept = () => {
        this.props.deleteUser(this.state.deleteUserId)
        this.setState({
            dialogOpen: false,
            deleteUserId: ''
        });
    }

    handleRefuse = () => {
        this.setState({
            dialogOpen: false,
            deleteUserId: ''
        });
    }

    handleCloseDialog = () => {
        this.setState({
            dialogOpen: false,
            deleteUserId: ''
        });
    }

    render() {
        return (
            <div>
                {this.state.dialogOpen ? <DialogBackdrop /> : null}
                <Dialog dialogOpen={this.state.dialogOpen}
                    closeDialog={this.handleCloseDialog}
                    refuse={this.handleRefuse}
                    agree={this.handleAccept}
                    message="Are you sure you want to delete this resident?"
                />
                <div className="listHeader">
                    <h2>All residents</h2>
                
                <div className="text-center">
                    <button className="btn btn-success mt-3"
                        onClick={() => { this.props.history.push('/residents/create') }}>Add new resident</button>
                </div>
                <div className="usersList">
                    {this.renderUserComponents()}
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(UsersList);