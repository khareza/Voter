import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { UserDetails } from './Details/UserDetails';
import { UserMethods } from '../../Helpers/UserMethods';

class UsersList extends Component {
    UserMethods = new UserMethods();


    renderUserComponents = () => {
        return this.props.users.map((user) => {
            return (
                <UserDetails key={user.id}
                    deleteUser={this.props.deleteUser}
                    editUser={
                        (id) => {
                            this.props.editUser(id)
                        }}
                    user={user} />
            )
        })
    }

    render() {
        return (
            <div className="usersList">
                <div className="headerLogin">
                    <h2>All residents</h2>
                </div>
                <div className="text-center">
                    <button className="btn btn-success mt-3"
                        onClick={() => { this.props.history.push('/residents/create') }}>Add new resident</button>
                </div>
                {this.renderUserComponents()}
            </div>
        );
    }
}

export default withRouter(UsersList);