import axios from "axios";
import { BASE_URL, DEV_URL } from "../constants/values";

const apiUrl = DEV_URL;

const loginService = {

    async login(email, password) {
        try {
            console.log("LOGIN RESPONSE", email, password)
            const response = await axios.post(
                `${apiUrl}/v1/login`,
                {
                    "email": email,
                    "password": password
                }
            );
            console.log("LOGIN RESPONSE", email, password, response.status)
            return response.data;
        } catch (error) {
            console.log(error)
            return -1;
        }
    },

    async refreshToken(email, password, refresh_token) {
        try {
            console.log("asked to refresh token", email, password, refresh_token)
            axios.defaults.headers.common['Authorization'] = `Bearer ${refresh_token}`;
            const response = await axios.get(
                `${apiUrl}/auth/refresh-token`,
                {
                    params: {
                        "email": email,
                        "password": password
                    }
                }
            );
            console.log("refresh token response", response.data)
            return response.data;
        } catch (error) {
            console.error('Error refreshing token:', error);
            throw new Error('Failed to refresh token');
        }
    }

};

export default loginService;
