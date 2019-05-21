import React, { Component } from 'react';
import { UserDetails } from './UserDetails';
import AuthMethods from '../Helpers/AuthMethods';
import axios from 'axios';

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
        axios.defaults.headers.common['Authorization'] =
            'Bearer ' + this.Auth.getToken();
        axios.get(`http://localhost:64763/api/Admin/GetUsers`)
            .then(res => {
                return res.data;
            })
            .then(res => {
                console.log(res);
                this.setState({ users: res })
            });
    }


    editUser = (userToEdit) => {
        this.props.editUser(userToEdit);
    }

    deleteUser = (userId) => {
        var newUsersList = this.state.users.filter((user) => user.id !== userId);
        this.setState({ users: newUsersList});
    }

    renderUsers = () => {
        return this.state.users.map( (user)=> {
            return (
                <UserDetails key={user.id} deleteUser={this.deleteUser} editUser={this.editUser} user={user}/>
            )
        })
    }

    render() {
        return (
            <div>
                {this.renderUsers()}
            </div>
        );
    }
}