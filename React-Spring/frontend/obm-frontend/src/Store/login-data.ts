import { action, makeAutoObservable, observable, runInAction } from 'mobx';
import { findUserByUsername } from '../api/user-api';
import { User } from '../models/user';


export enum USER_ROLE {
    ADMIN = "ADMIN",
    SCIENTIST = "SCIENTIST",
    USER = "USER"
};

class LoginData {
    @observable username = ""; 
    @observable password = ""; 
    @observable cookie = false;
    @observable usernameCookie = "";
    @observable role = "";

    
    
    constructor() {
        makeAutoObservable(this);
        this.role === USER_ROLE.SCIENTIST
        try {
            const item = window.localStorage.getItem("cookie");
            if (item) {
                runInAction(() => {
                this.cookie = JSON.parse(item);
                })
            }
          } catch (error) {
            console.log(error);
        }
        try {
            const item = window.localStorage.getItem("username");
            if (item) {
                runInAction(() => {
                this.usernameCookie = JSON.parse(item);
                this.username = JSON.parse(item);
                this.setRoleByUsername(this.username);
            })}
        } catch (error) {
            console.log(error);
        }
    }
    
    @action setUsername(username: string) {
        this.username = username;
    }
    
    @action setPassword(password: string) {
        this.password = password;
    }
    
    @action setCookie(cookie: boolean) {
        this.cookie = cookie;
        try{
            window.localStorage.setItem("cookie", JSON.stringify(cookie));    
        } catch (err){
            console.log("Error while setting cookie", err);
        }
    }
    
    @action setUsernameCookie = async(username: string) => {
        this.usernameCookie = username;
        console.log(this)
        try{
            window.localStorage.setItem("username", JSON.stringify(username));    
        } catch (err){
            console.log("Error while setting usernameCookie", err);
        }
    }
    
    @action setRole(role: string | null) {
        this.role = role !== null ? role : "";
        this.role === USER_ROLE.SCIENTIST
    }
    
    @action setRoleToNone() {
        this.role = "";
    }

    @action async setRoleByUsername(username: string) {
        const userModel : User = await findUserByUsername(username);
        console.log(userModel)
        this.setRole(userModel.role);
    }
    
    // @action isAdminUser = () => this.role === 'ADMIN';
    @action isAdminUser = () => this.role === USER_ROLE.ADMIN;
    
    @action isScientistUser = () => this.role === USER_ROLE.SCIENTIST;
    
    @action setData(user: User) {
        this.setCookie(true);
        this.setUsername(user.username);
        this.setUsernameCookie(user.username);
        this.setRole(user.role)
    }
    
}

const loginData = new LoginData();
export default loginData;