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

    getActiveResolutions = () => {
        return axios.get(`${this.resolutionApiUrl}/GetActiveResolutions`);
    }

    getExpiredResolutions = () => {
        return axios.get(`${this.resolutionApiUrl}/GetExpiredResolutions`);
    }

    getResolutionsWithoutUserVote = () => {
        const userId = this.auth.getUserId();
        return axios.get(`${this.resolutionApiUrl}/GetResolutionsWithoutUserVote/${userId}`);
    }

    createResolution = (newResolutionFormData) => {
        return axios.post(`${this.resolutionApiUrl}/CreateResolution`, newResolutionFormData);
    }
}