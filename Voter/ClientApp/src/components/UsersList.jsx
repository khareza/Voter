﻿import React, { Component } from 'react';
import { UserDetails } from './UserDetails';
import AuthMethods from '../Helpers/AuthMethods';
import { withRouter } from 'react-router-dom';

class UsersList extends Component {
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

    //editUser = (userToEdit) => {
    //    this.props.editUser(userToEdit);
    //}

    deleteUser = (id) => {
        this.Auth.deleteUser(id)
            .then(() => { this.getUsers() })
            .catch(err => { console.log(err) });
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

    //redirectToRegisterForm = () => {
    //    this.props.history.push('/residents/create');

    //}



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