import decode from 'jwt-decode';
import axios from 'axios';

export default class AuthMethods {
    constructor() {
        this.apiUrl = "http://localhost:64763/api/";
        
    }
    //localhost:64763/
    //localhost:50123/
    login = (loginFormData) => {
        return axios.post(`${this.apiUrl}authorization/login`, loginFormData)
            .then(res => {
                this.setToken(res.data.token);
                return Promise.resolve(res);
            })
    }

    logout = () => {
        localStorage.removeItem("id_token");
    };


    loggedIn = () => {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken();
        return !!token && !this.isTokenExpired(token);
    };

    register = (registerFormData) => {
        axios.defaults.headers.common['Authorization'] =
            'Bearer ' + this.getToken();
        return axios.post(`${this.apiUrl}Admin/Register`, registerFormData);
    }

    isUserAdmin = () => {
       var role = JSON.parse(window.atob(this.getToken().split(".")[1])).role
        if (role==="Admin") {
            return true;
        } else {
            return false;
        }
    }

    isTokenExpired = token => {

        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) {
                return true;
            } else return false;
        } catch (err) {
            console.log("Token validation failed");
            return false;
        }
    };

    setToken = idToken => {
        localStorage.setItem("id_token", idToken);
    };

    getToken = () => {
        return localStorage.getItem("id_token");
    };

    getConfirm = () => {
        // Check token validation
        let answer = decode(this.getToken());
        console.log("Recieved answer!");
        return answer;
    };

    //getActiveUser = () => {
    //    var userId = JSON.parse(window.atob(this.getToken().split(".")[1])).UserID;

    //    axios.defaults.headers.common['Authorization'] =
    //        'Bearer ' + this.getToken();
    //   return axios.get(`${this.apiUrl}voter/GetUserData`, userId);
    //}


    editUser = (editFormData) => {
        axios.defaults.headers.common['Authorization'] =
            'Bearer ' + this.getToken();
        return axios.put(`${this.apiUrl}Admin/EditUser`, editFormData);
    }

    deleteUser = (id) => {
        axios.defaults.headers.common['Authorization'] =
            'Bearer ' + this.getToken();
        console.log(id);
        return axios.delete(`${this.apiUrl}Admin/DeleteUser/` + id);
    }

    getUsers = () => {
        axios.defaults.headers.common['Authorization'] =
            'Bearer ' + this.getToken();
        return axios.get(`${this.apiUrl}Admin/GetUsers`);
    }

    checkIfTokenIsValid = () => {


    }

}
