import React, { Component } from 'react';
import { UsersListWrapper } from './UsersListWrapper';
import AuthMethods from '../Helpers/AuthMethods';

export class UserProfile extends Component {

    Auth = new AuthMethods();
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    register = (registerFormData) => {
        this.Auth.register(registerFormData)
            .then(res => {
                console.log(res);
            }).catch(err => {
                console.log(err);
            });
    }

    renderRegisterFormIfAdmin = () => {
        if (this.Auth.isUserAdmin()) {
            return (
                <UsersListWrapper register={this.register} />
            );
        }
    }

    render() {
        return (
            <div>
                {this.renderRegisterFormIfAdmin()}
            </div>
        );
    }

}