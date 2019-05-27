import axios from 'axios';
import AuthMethods from './AuthMethods';

export class ResolutionMethods {
    constructor() {
        this.auth = new AuthMethods();
        this.resolutionApiUrl = "/api/Resolution";

        axios.defaults.headers.common['Authorization'] =
            'Bearer ' + this.auth.getToken();
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