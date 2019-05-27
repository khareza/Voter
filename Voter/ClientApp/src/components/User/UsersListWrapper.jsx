import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { RegisterNewUser } from './ActionForms/RegisterNewUser';
import UsersList from './UsersList';
import EditUserForm from './ActionForms/EditUserForm';
import AuthMethods from '../../Helpers/AuthMethods';

export class UsersListWrapper extends Component {
    Auth = new AuthMethods();
    state = {
        userToEdit: {}
    }

    editUser = (userToEdit) => {
        this.setState({
            userToEdit       
        });
        this.props.history.push('/residents/edit')
    }

    render() {
        return (
            <div>
                <Route exact path="/residents" render={() => (<UsersList editUser={this.editUser} />)}/>
                <Route exact path="/residents/create" component={RegisterNewUser} />
                <Route exact path="/residents/edit" render={() => ( <EditUserForm userToEdit={this.state.userToEdit}/> )} />
            </div>
        );
    }
}