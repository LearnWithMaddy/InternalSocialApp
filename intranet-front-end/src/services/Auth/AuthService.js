import AuthApiService from "../../api/AuthApiService.js";

const AuthService = {
    login: async (username, password) => {

        if (!username || !password) {
            return {
                status: false,
                message: 'Username and password are required.',
                response: null,
            };
        }

        const payload = {username, password};
        const result = await AuthApiService.login(payload);

        if (result.status && result.response?.token) {
            localStorage.setItem('accessToken', result.response.token);
        }

        return result;
    }
};

export default AuthService;
