import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { UserDetails } from './Details/UserDetails';
import { UserMethods } from '../../Helpers/UserMethods';

class UsersList extends Component {
    constructor(props) {
        super(props);

        this.UserMethods = new UserMethods();
        this.state = {
            users: this.props.users
        }
    }

    renderUserComponents = () => {
        return this.state.users.map((user) => {
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