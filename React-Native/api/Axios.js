import axios from 'axios';
import AuthRepository from '../db/authRepository';

let isRefreshing = false;
let refreshTokenPromise = null;

axios.interceptors.request.use(async (config) => {
    // Check if the request is being made to the token endpoint to avoid infinite loop
    console.log("sending request to:", config.url, config.headers['Authorization'])
    if (!config.url.endsWith('/refresh-token') && !config.url.endsWith('/login')) {
        const token = await getToken();
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, error => {
    console.log("error in interceptor", error)
    return Promise.reject(error);
});


const getToken = async () => {
    if (isRefreshing) {
        if (!refreshTokenPromise) {
            refreshTokenPromise = new Promise(resolve => {
                // Once the token is refreshed, resolve the promise
                setTimeout(async () => {
                    refreshTokenPromise = null;
                    resolve(await getToken());
                }, 2000);
            });
        }
        return refreshTokenPromise;
    }
    const loginData = await AuthRepository.getLoginData();
    if (!loginData) {
        return null;
    }
    if (!AuthRepository.isAccessTokenActive(loginData.date)) {
        isRefreshing = true;
        try {
            const refreshedToken = await AuthRepository.refreshToken(loginData.email, loginData.password, loginData.refresh_token, loginData.partnerId);
            isRefreshing = false;
            return refreshedToken;
        } catch (error) {
            isRefreshing = false;
            throw error;
        }
    }
    console.log('returning token', loginData.access_token)
    return loginData.access_token;
};

export default axios;
