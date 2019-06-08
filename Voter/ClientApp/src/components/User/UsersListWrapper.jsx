import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { RegisterNewUser } from './ActionForms/RegisterNewUser';
import UsersList from './UsersList';
import EditUserForm from './ActionForms/EditUserForm';
import { NotificationManager } from 'react-notifications';
import { UserMethods } from '../../Helpers/UserMethods';

export class UsersListWrapper extends Component {

    constructor(props) {
        super(props);

        this.UserMethods = new UserMethods();
        this.state = {
            users: ''
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
                var newList = this.state.users.filter((user) => (user.id !== id));
                this.setState({ users: newList });
                NotificationManager.success('Delete Successful', 'Correct');
            })
            .catch(err => {
                NotificationManager.error('Unsuccessful user delete', 'Error!');
            });
    }

    editUser = (id) => {
        var index = this.state.users.findIndex((user)=>(user.id === id))
        this.props.history.push(`/residents/edit/${index}`)
    }

    getUserToEdit = (index) => {
        return this.state.users[index];
    }

    render() {
        return (
            <div>
                {this.state.users ?
                    <div>
                        <Route exact path="/residents" render={() => (<UsersList editUser={this.editUser} users={this.state.users} deleteUser={this.deleteUser} />)} />
                        <Route exact path="/residents/create" component={RegisterNewUser} />
                        <Route exact path="/residents/edit/:user_id" render={() => (<EditUserForm getUserToEdit={this.getUserToEdit} userToEdit={this.state.userToEdit} />)} />
                    </div>
                    : null}
            </div>
        );
    }
}