import React, { Component } from 'react';
import { RegisterNewUser } from './RegisterNewUser';
import AuthMethods from '../Helpers/AuthMethods';

export class UserProfile extends Component {

    Auth = new AuthMethods();

    state = {
        userRole: JSON.parse(window.atob(this.Auth.getToken().split(".")[1])).role
    }

    register = (registerFormData) => {
        this.Auth.register(registerFormData)
            .then(res => {
                console.log(res);
            }).catch(err => {
                console.log(err);
            });
    }

    renderRegisterButtonIfAdmin = () => {
        if (this.state.userRole === "Admin") {
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
                    this.renderRegisterButtonIfAdmin()
                }
            </div>
        );
    }

}