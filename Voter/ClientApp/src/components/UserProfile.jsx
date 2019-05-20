import React, { Component } from 'react';
import { RegisterNewUser } from './RegisterNewUser';
import axios from 'axios';

export class UserProfile extends Component {

    state = {
        userRole: JSON.parse(window.atob(localStorage.getItem("id_token").split(".")[1])).role
    }

    register = (registerFormData) => {
        axios.post("http://localhost:64763/api/voter/Register", registerFormData)
            .then(res => {
                //toast().succsess("success");
                console.log(res);

            }).catch(err => {
                //toast().error("Errors");
                console.log(err);
            });
    }

    renderRegisterButtonIfAdmin = () => {
        console.log(this.state.userRole);
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

//<td>{this.props.activeUser.firstName}</td>
//    <td>{this.props.activeUser.lastName}</td>
//    <td>{this.props.activeUser.email}</td>