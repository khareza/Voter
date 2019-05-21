import React, { Component } from 'react';
import { RegisterNewUser } from './RegisterNewUser';
import { UsersList } from './UsersList';

export class UsersListWrapper extends Component {

    state = {
        showRegisterForm: false
    }

    showRegisterFormOnClick = () => {
        this.setState({ showRegisterForm: !this.state.showRegisterForm});
    }

    render() {
        return (
            <div>
                <button onClick={this.showRegisterFormOnClick}>Add new user</button>
                {this.state.showRegisterForm ? <RegisterNewUser /> : <UsersList />}
            </div>
            
            );
    }
}