import decode from 'jwt-decode';
import axios from 'axios';

export default class AuthMethods {
    constructor() {
        this.authorizationApiUrl = "/api/Authorization";
        this.resolutionApiUrl = "/api/Resolution";
        this.adminApiUrl = "/api/AppUser";
    }

    login = (loginFormData) => {
        return axios.post(`${this.authorizationApiUrl}/login`, loginFormData)
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
        return axios.post(`${this.adminApiUrl}/Register`, registerFormData);
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

}
