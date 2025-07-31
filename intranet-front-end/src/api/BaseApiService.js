import axios from 'axios';
import {BASE_URL} from "../data/Constant.js";

const BaseApi = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
});

// Attach token to all requests if available
BaseApi.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

// Centralized handler
const handleRequest = async (method, url, dataOrConfig = {}, config = {}) => {
    try {
        let response;

        console.log(dataOrConfig)

        if (method === 'get' || method === 'delete') {
            response = await BaseApi[method](url, dataOrConfig); // dataOrConfig is config for GET/DELETE
        } else {
            response = await BaseApi[method](url, dataOrConfig, config); // dataOrConfig is data for POST/PUT
        }

        return {
            status: true,
            message: 'Success',
            response: response.data,
        };
    } catch (error) {
        let message = 'Something went wrong.';

        if (error.response) {
            const statusCode = error.response.status;
            const serverMsg = error.response.data?.message || '';

            message =
                {
                    400: 'Bad request. Please check your input.',
                    401: 'Unauthorized. Please check your credentials and try logging in again.',
                    403: 'Access forbidden.',
                    404: 'API endpoint not found.',
                    500: 'Internal server error.',
                }[statusCode] || serverMsg || 'Unexpected server error.';
        } else if (error.request) {
            message = 'Network error. Please check your internet connection.';
        } else {
            message = error.message || 'Client-side error occurred.';
        }

        return {
            status: false,
            message,
            response: null,
        };
    }
};

const BaseRequestService = {
    get: (url, config = {}) => handleRequest('get', url, config),
    post: (url, data, config = {}) => handleRequest('post', url, data, config),
    put: (url, data, config = {}) => handleRequest('put', url, data, config),
    delete: (url, config = {}) => handleRequest('delete', url, config),
};

export default BaseRequestService;
