import axios from "axios";

export const APIMiddleware = {

    async get(url, config) {
        return axios.get(url, { responseType: 'json' });
    },


    async post(url, config) {
        const { data } = config;
        return axios.post(url, data, { responseType: 'json' });
    },

}