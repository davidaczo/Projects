import React, { useState, useCallback, FC } from 'react';
import {
    Button,
    Avatar,
} from '@material-ui/core';
// import { useLocalStorage } from './local-storage-hook';
import {LoginDialog} from './login-dialog';
import loginData from '../../Store/login-data';
import { useTranslation } from 'react-i18next';
import { logoutUser } from '../../api/user-api';
import { observer } from 'mobx-react';

export const Login: FC = () => {
    const {t} = useTranslation();
    const [visible, setVisible] = useState(false);

    const openDialog = useCallback(() => setVisible(true), []);
    const closeDialog = useCallback(() => setVisible(false), []);
    const handleLogout = useCallback( async () => {
        const response = await logoutUser();
        if (response !== null && response?.length !== 0) {
            // setCookie(false);
            loginData.setUsername("");
            loginData.setPassword("");
            loginData.setCookie(false);
            loginData.setUsernameCookie("");
            loginData.setRoleToNone();
        }
    }, []); 
    return (
        <>
            {!loginData.cookie ? (
                <Button color="inherit" onClick={openDialog} >{t('login')}</Button>
            ) : (

                <Button onClick={handleLogout}>
                    <Avatar >{loginData.username.charAt(0).toUpperCase()}</Avatar>
                </Button>

            )
            }

            <LoginDialog 
                closeDialog = {closeDialog}  
                // setCookie = {loginData.setCookie} 
                visible = {visible} 
            />  
        </>
    )
}
export const LoginObserver = observer(Login);
