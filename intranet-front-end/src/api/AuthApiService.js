import BaseRequestService from "./BaseApiService.js";


const AuthApiService = {
    login: (payload) => BaseRequestService.post('/auth/login', payload),
};

export default AuthApiService;
