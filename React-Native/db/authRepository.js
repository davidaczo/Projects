import AsyncStorage from '@react-native-async-storage/async-storage';
// import authService from '../api/AuthApi';
import loginService from '../api/LoginApi';

const LOGIN_DATA = 'loginData';

class AuthRepository {

    static async saveLoginData(email, password, access_token, refresh_token, partnerId) {
        try {
            await AsyncStorage.setItem(LOGIN_DATA, JSON.stringify({ email, password, access_token, refresh_token, partnerId, date: new Date().getTime() / 1000 }));
        } catch (error) {
            console.error('Error saving login data:', error);
        }
    }

    static async getLoginData() {
        try {
            const loginDataJSON = await AsyncStorage.getItem(LOGIN_DATA);
            if (loginDataJSON) {
                return JSON.parse(loginDataJSON);
            }
            return null;
        } catch (error) {
            console.error('Error getting login data:', error);
            return null;
        }
    }

    static isAccessTokenActive(date) {
        try {
            if (new Date().getTime() / 1000 - date < 3600) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error('Error checking access token:', error);
            return null;
        }
    }

    static async refreshToken(email, password, refresh_token, partnerId) {
        try {
            const newAccessToken = await loginService.refreshToken(email, password, refresh_token);
            await AuthRepository.saveLoginData(email, password, newAccessToken.access_token, refresh_token, partnerId);
            return newAccessToken.access_token;
        } catch (error) {
            console.error('Error refreshing token:', error);
            return null;
        }
    }

    static async clearLoginData() {
        try {
            await AsyncStorage.removeItem(LOGIN_DATA);
        } catch (error) {
            console.error('Error clearing login data:', error);
        }
    }
}

export default AuthRepository;
