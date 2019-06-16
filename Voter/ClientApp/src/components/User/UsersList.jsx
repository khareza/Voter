import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { UserDetails } from './Details/UserDetails';
import { UserMethods } from '../../Helpers/UserMethods';
import DeleteDialog from '../DialogBoxes/DeleteDialog';
import DialogBackdrop from '../DialogBoxes/DialogBackdrop';

class UsersList extends Component {
    UserMethods = new UserMethods();

    constructor(props) {
        super(props);
        this.state = {
            dialogErrorOpen: false,
            deleteUserId: ''
        }
    }

    renderUserComponents = () => {
        return this.props.users.map((user) => {
            return (
                <UserDetails key={user.id}
                    handleErrorDialogOpen={this.handleErrorDialogOpen}
                    editUser={
                        (id) => {
                            this.props.editUser(id)
                        }}
                    user={user} />
            )
        })
    }

    handleErrorDialogOpen = (id) => {
        this.setState({
            dialogErrorOpen: true,
            deleteUserId: id
        });
    }

    handleAccept = () => {
        this.props.deleteUser(this.state.deleteUserId)
        this.setState({
            dialogErrorOpen: false,
            deleteUserId: ''
        });
    }

    handleRefuse = () => {
        this.setState({
            dialogErrorOpen: false,
            deleteUserId: ''
        });
    }

    handleCloseDialog = () => {
        this.setState({
            dialogErrorOpen: false,
            deleteUserId: ''
        });
    }

    render() {
        return (
            <div>
                {this.state.dialogErrorOpen ? <DialogBackdrop /> : null}
                <DeleteDialog dialogErrorOpen={this.state.dialogErrorOpen}
                    closeDialog={this.handleCloseDialog}
                    refuse={this.handleRefuse}
                    agree={this.handleAccept}
                    message="Are you sure you want to delete this resident?"
                />
                <div className="usersList">
                    <div className="listHeader">
                        <h2>All residents</h2>
                    </div>
                    <div className="text-center">
                        <button className="btn btn-success mt-3"
                            onClick={() => { this.props.history.push('/residents/create') }}>Add new resident</button>
                    </div>
                    {this.renderUserComponents()}
                </div>
            </div>
        );
    }
}

export default withRouter(UsersList);