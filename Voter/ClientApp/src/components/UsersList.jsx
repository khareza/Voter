import React, { Component } from 'react';
import { UserDetails } from './UserDetails';
import AuthMethods from '../Helpers/AuthMethods';

export class UsersList extends Component {
    Auth = new AuthMethods();
    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        this.getUsers();
    }

    getUsers = () => {
        this.Auth.getUsers()
            .then(res => {
                this.setState({ users: res.data })
            });
    }

    editUser = (userToEdit) => {
        this.props.editUser(userToEdit);
    }

    deleteUser = (id) => {
        this.Auth.deleteUser(id)
            .then(() => { this.getUsers() })
            .catch(err => { console.log(err) });
    }

    renderUserComponents = () => {
        return this.state.users.map( (user)=> {
            return (
                <UserDetails key={user.id} deleteUser={this.deleteUser} editUser={this.editUser} user={user}/>
            )
        })
    }

    render() {
        return (
            <div>
                {this.renderUserComponents()}
            </div>
        );
    }
}