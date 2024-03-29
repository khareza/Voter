﻿import axios from 'axios';
import AuthMethods from './AuthMethods';

export default class UserMethods {
    constructor() {
        this.auth = new AuthMethods();
        this.adminApiUrl = "/api/Admin";
        this.residentApiUrl = "/api/Resident";

        axios.defaults.headers.common['Authorization'] =
            'Bearer ' + this.auth.getToken();
    }

    editUser = (editFormData) => {
        return axios.put(`${this.adminApiUrl}/EditUser`, editFormData);
    }

    deleteUser = (id) => {
        return axios.delete(`${this.adminApiUrl}/DeleteUser/` + id);
    }

    getUsers = () => {
        return axios.get(`${this.adminApiUrl}/GetUsers`);
    }

    sendVote = (voteFormData) => {
        return axios.post(`${this.residentApiUrl}/Vote`, voteFormData);
    }

    register = (registerFormData) => {
        return axios.post(`${this.adminApiUrl}/Register`, registerFormData);
    }

}

