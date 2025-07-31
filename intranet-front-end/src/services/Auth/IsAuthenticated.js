// src/utils/IsAuthenticated.js
import axios from 'axios';
import {BASE_URL} from "../../data/Constant.js";

const IsAuthenticated = async () => {

    console.log("Is Authenticated")

    const token = localStorage.getItem('accessToken');

    if (!token) {
        console.log("I am here")
        return false;
    }
    try {
        const response = await axios.get(`${BASE_URL}/auth/validate`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.status === 200;
    } catch (error) {
        console.log(error)
        return false;
    }
};

export default IsAuthenticated;
