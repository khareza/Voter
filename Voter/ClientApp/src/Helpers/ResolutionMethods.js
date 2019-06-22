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
    getResolutionById = (id) => {
        return axios.get(`${this.resolutionApiUrl}/GetResolutionById/${id}`);
    }

    //GETTERS WITHOUT GROUPING
    ///
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

    getExpiredResolutionsWithUserVote = () => {
        const userId = this.auth.getUserId();
        return axios.get(`${this.resolutionApiUrl}/GetExpiredResolutionsWithUserVote/${userId}`);
    }
    ////

    //GETTERS WITH GROUPING
    ////
    getGroupedResolutions = () => {
        return axios.get(`${this.resolutionApiUrl}/GetGroupedResolutions`);
    }
    getGroupedActiveResolutions = () => {
        return axios.get(`${this.resolutionApiUrl}/GetGroupedActiveResolutions`);
    }

    getGroupedExpiredResolutions = () => {
        return axios.get(`${this.resolutionApiUrl}/GetGroupedExpiredResolutions`);
    }

    getGroupedResolutionsWithoutUserVote = () => {
        const userId = this.auth.getUserId();
        return axios.get(`${this.resolutionApiUrl}/GetGroupedResolutionsWithoutUserVote/${userId}`);
    }
    ////

    getResolutionWithResults = (resolutionId) => {
        return axios.get(`${this.resolutionApiUrl}/GetResolutionWithResults/${resolutionId}`);
    }

    getResidentsWithVotes = (resolutionId) => {
        return axios.get(`${this.resolutionApiUrl}/GetResidentsWithVotes/${resolutionId}`);
    }

    createResolution = (newResolutionFormData) => {
        return axios.post(`${this.resolutionApiUrl}/CreateResolution`, newResolutionFormData);
    }
}