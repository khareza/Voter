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

    renderUsers = () => {
        return this.state.users.map(function (user) {
            return (
                <UserDetails key={user.id} user={user}/>
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