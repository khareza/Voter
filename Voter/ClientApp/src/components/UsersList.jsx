import React, { Component } from 'react';
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
        return this.state.users.map(function (item, index) {
            return (
                <tr key={item.id}>
                    <td >{item.firstName}</td>
                    <td >{item.lastName}</td>
                    <td >{item.email}</td>
                </tr>
            )
        })
    }

    render() {
        return (
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderUsers()}
                    </tbody>
                </table>
            </div>
        );
    }
}