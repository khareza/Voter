import axios from 'axios';
import AuthMethods from './AuthMethods';

export class ResolutionMethods {
    constructor() {
        this.auth = new AuthMethods();
        axios.defaults.headers.common['Authorization'] =
            'Bearer ' + this.auth.getToken();
        this.resolutionApiUrl = "/api/Resolution";
    }

    editResolution = (resolutionFormData) => {
        return axios.put(`${this.resolutionApiUrl}/EditResolution`, resolutionFormData);
    }

    deleteResolution = (id) => {
        return axios.delete(`${this.resolutionApiUrl}/DeleteResolution/` + id);
    }

    getResolutions = () => {
        return axios.get(`${this.resolutionApiUrl}/GetResolutions`);
    }

    createResolution = (newResolutionFormData) => {
        return axios.post(`${this.resolutionApiUrl}/CreateResolution`, newResolutionFormData);
    }
}