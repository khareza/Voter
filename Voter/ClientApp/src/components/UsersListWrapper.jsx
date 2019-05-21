import React, { Component } from 'react';
import { RegisterNewUser } from './RegisterNewUser';
import { UsersList } from './UsersList';
import { EditUserForm } from './EditUserForm';

export class UsersListWrapper extends Component {

    state = {
        showRegisterForm: false,
        editMode: false,
        userToEdit: {}
    }

    showRegisterFormOnClick = () => {
        this.setState({ showRegisterForm: !this.state.showRegisterForm });
    }

    renderButtonWithComponent = () => {
        if (this.state.showRegisterForm) {
            return (
                <div>
                    <div className="text-center">
                        <button className="btn btn-primary" onClick={this.showRegisterFormOnClick}>Display users</button>
                    </div>
                    <div>
                        <RegisterNewUser />
                    </div>
                </div>)
        }
        else {
            return (
                <div>
                    <div className="text-center">
                        <button className="btn btn-success" onClick={this.showRegisterFormOnClick}>Add new user</button>
                    </div>
                    <div>
                        <UsersList editUser={this.editUser}/>
                    </div>
                </div>)
        }
    }

    editUser = (userToEdit) => {
        this.setState({
            editMode: !this.state.editMode,
            userToEdit       
        });

    }

    render() {
        return (
            <div>
                {this.state.editMode ? <EditUserForm userToEdit={this.state.userToEdit}/> : this.renderButtonWithComponent()}
            </div>
        );
    }
}