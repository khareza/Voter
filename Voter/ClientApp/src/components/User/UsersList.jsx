﻿import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import { UserDetails } from './Details/UserDetails';
import { UserMethods } from '../../Helpers/UserMethods';

class UsersList extends Component {
    constructor(props) {
        super(props);

        this.UserMethods = new UserMethods();
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        this.getUsers();
    }

    getUsers = () => {
        this.UserMethods.getUsers()
            .then(res => {
                this.setState({ users: res.data })
            });
    }

    deleteUser = (id) => {
        this.UserMethods.deleteUser(id)
            .then(() => {
                NotificationManager.success('Delete Successful', 'Correct');
                this.getUsers()
            })
            .catch(err => {
                NotificationManager.error('Unsuccessful user delete', 'Error!', 5000, () => {
                });
            });
    }

    renderUserComponents = () => {
        return this.state.users.map( (user)=> {
            return (
                <UserDetails key={user.id}
                    deleteUser={this.deleteUser}
                    editUser={
                        (userToEdit) => {
                            this.props.editUser(userToEdit)
                        }}
                    user={user} />
            )
        })
    }

    render() {
        return (
            <div>
                <div className="headerLogin">
                    <h2>All residents</h2>
                </div>
                {this.renderUserComponents()}
                <div className="text-center">
                    <button className="btn btn-success mt-3"
                        onClick={() => { this.props.history.push('/residents/create') }}>Add new resident</button>
                </div>
            </div>
        );
    }
}

export default withRouter(UsersList);