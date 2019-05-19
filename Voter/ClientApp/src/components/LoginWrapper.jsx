import React, { Component } from 'react';
import axios from 'axios';
import { Login } from './LoginForm';


export class LoginWrapper extends Component {

    saveToken = (token) => {
        this.props.saveToken(token);
    }

    //login = (loginFormData) => {
    //    fetch("http://localhost:64763/api/voter/login", {
    //        method: 'POST',
    //        headers: {
    //            'Accept': 'application/json',
    //            'Content-Type': 'application/json',
    //        },
    //        body: JSON.stringify({
    //            userName: loginFormData.userName,
    //            password: loginFormData.password,
    //        })
    //    }).then(res => {
    //        //get response from api and convert it to json
    //        return res.json();
    //    }).then(
    //        //get token from json object
    //        res => {
    //            this.saveToken(res.token);
    //        }
    //    ).catch(err => {
    //        //catch doesnt work :( 
    //        console.log(err)
    //    });
    login = (loginFormData) => {
        axios.post("http://localhost:64763/api/voter/login", loginFormData)
            .then(res => {
                this.saveToken(res.data.token);
            }).catch(err => {
                //catch doesnt work :( 
                console.log(err)
            });
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-10 offset-md-1">
                        <Login login={this.login} />
                    </div>
                </div>
            </div>
        );
    }
}