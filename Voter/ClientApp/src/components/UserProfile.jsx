import React, { Component } from 'react';
import { RegisterNewUser } from './RegisterNewUser';
import AuthMethods from '../Helpers/AuthMethods';

export class UserProfile extends Component {

    Auth = new AuthMethods();

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
                <RegisterNewUser register={this.register}/>
            );
        }
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
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
                {
                    this.renderRegisterFormIfAdmin()
                }
            </div>
        );
    }

}