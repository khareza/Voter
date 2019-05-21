import React, { Component } from 'react';
import { RegisterNewUser } from './RegisterNewUser';
import { UsersList } from './UsersList';

export class UsersListWrapper extends Component {

    state = {
        showRegisterForm: false
    }

    showRegisterFormOnClick = () => {
        this.setState({ showRegisterForm: !this.state.showRegisterForm });
    }

    renderButtonWithComponent = () => {
        if (this.state.showRegisterForm) {
            return (
                <div>
                    <button onClick={this.showRegisterFormOnClick}>Display users</button>
                    <RegisterNewUser />
                </div>)
        }
        else {
            return (
                <div>
                    <button onClick={this.showRegisterFormOnClick}>Add new user</button>
                    <UsersList />
                </div>)
        }
    }

    render() {
        return (
            <div>
                {this.renderButtonWithComponent()}
            </div>
        );
    }
}