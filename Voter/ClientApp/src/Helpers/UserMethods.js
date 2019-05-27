import axios from 'axios';
import AuthMethods from './AuthMethods';

export class UserMethods {
    constructor() {
        this.auth = new AuthMethods();
        axios.defaults.headers.common['Authorization'] =
            'Bearer ' + this.auth.getToken();
        this.adminApiUrl = "/api/AppUser";
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

    //getActiveUser = () => {
    //    var userId = JSON.parse(window.atob(this.getToken().split(".")[1])).UserID;

    //    axios.defaults.headers.common['Authorization'] =
    //        'Bearer ' + this.getToken();
    //   return axios.get(`${this.apiUrl}voter/GetUserData`, userId);
    //}
}

