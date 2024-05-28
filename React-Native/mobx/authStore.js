import { makeAutoObservable, observable, action, computed, set, runInAction } from "mobx";
import loginService from "../api/LoginApi";
import axios from "../api/Axios";
import AuthRepository from "../db/authRepository";
import authService from "../api/AuthApi";

class AuthStore {
    constructor() {
        makeAutoObservable(this);
    }

    @observable email = "";
    @observable password = "";
    @observable access_token = "";
    @observable refresh_token = "";
    @observable isLoggedIn = false;
    @observable isLoading = false;
    @observable error = null;
    @observable partnerId = null;
    @observable name = null;
    @observable status = null;

    @action
    async login(email, password) {
        try {
            this.setIsLoading(true);
            const resp = await loginService.login(email, password);
            if (resp == -1) {
                console.log("Invalid email or password")
                // this.setError("Invalid email or password");
                this.setIsLoggedIn(false);
                this.setIsLoading(false);

                return;
            }
            const { access_token, refresh_token, partner_id } = resp;
            this.setAccessToken(access_token);
            this.setRefreshToken(refresh_token);
            this.setPartnerId(partner_id);
            await AuthRepository.saveLoginData(email, password, access_token, refresh_token, partner_id);
            await this.fetchCredentials();
            setTimeout(() => {
                this.setIsLoggedIn(true);
                this.setIsLoading(false);
            }, 2000);
        } catch (error) {
            console.log(error)
            this.setError(error);
        }
    }

    @action
    async fetchCredentials() {
        const loginData = await AuthRepository.getLoginData();
        if (loginData) {
            this.setEmail(loginData.email);
            this.setPassword(loginData.password);
            this.setAccessToken(loginData.access_token);
            this.setRefreshToken(loginData.refresh_token);
            this.setPartnerId(loginData.partnerId);
            const resp = await authService.getPartner(loginData.partnerId);
            console.log("resp", resp)
            const { status, name } = resp;
            this.setStatus(status);
            this.setName(name);
            console.log('fetched partner', status)
            this.setIsLoggedIn(true);
        }
    }

    @action
    async logout() {
        try {
            this.setIsLoading(true);
            await AuthRepository.clearLoginData();
            this.setIsLoggedIn(false);
            this.setIsLoading(false);
        } catch (error) {
            console.log("error", error)
            this.setError(error);
        }
    }

    @action setIsLoading(value) {
        this.isLoading = value;
    }

    @action setIsLoggedIn(value) {
        this.isLoggedIn = value;
    }

    @action setEmail(value) {
        this.email = value;
    }

    @action setPassword(value) {
        this.password = value;
    }

    @action setAccessToken(value) {
        this.access_token = value;
    }

    @action setRefreshToken(value) {
        this.refresh_token = value;
    }

    @action setPartnerId(value) {
        console.log('setting partner id')
        this.partnerId = value;
    }

    @action setError(value) {
        this.error = value;
    }

    @action setName(value) {
        this.name = value;
    }

    @action setStatus(value) {
        this.status = value;
    }
}
export const authStore = new AuthStore();


