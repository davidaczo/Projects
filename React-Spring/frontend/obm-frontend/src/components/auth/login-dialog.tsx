import React, { useState, useCallback } from 'react';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    Snackbar,
} from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { PasswordField } from './password-field';
import loginData from '../../Store/login-data';
import { useTranslation } from 'react-i18next';
import { findUserByUsername, loginUser } from '../../api/user-api';
import { User } from '../../models/user';

type Props = {
    visible: boolean;
    closeDialog: () => void;
    // setCookie: (value: boolean) => void;
};

export const LoginDialog = ({ visible, closeDialog }: Props) => {
    const { t } = useTranslation();
    const [visibleError, setVisibleError] = useState(false);
    const [visibleSuccess, setVisibleSuccess] = useState(false);

    const closeErrorAlert = useCallback(() => setVisibleError(false), []);
    const closeSuccessAlert = useCallback(() => setVisibleSuccess(false), []);

    const handleLogin = useCallback(async () => {
        if (loginData.username === '' || loginData.password === '') {
            setVisibleError(true);
            return;
        }

        const response = await loginUser(loginData.username, loginData.password);
        console.log(response)
        console.log(loginData)
        if (response !== null) {
            setVisibleSuccess(true);
            const userModel : User = await findUserByUsername(loginData.username);
            loginData.setData(userModel);
        }
        closeDialog();
        return;
    }, [closeDialog]);
    

    return (
        <>
            <Dialog onClose={closeDialog} open={visible}>
                <DialogTitle>{t('login')}</DialogTitle>

                <DialogContent>
                    <TextField
                        fullWidth
                        id="email"
                        label="Email Address"
                        margin="dense"
                        // eslint-disable-next-line react/jsx-no-bind
                        onChange={(e) => loginData.setUsername(e.target.value)}
                        type="email"
                        variant="standard"
                    />

                    <PasswordField />

                    <Snackbar autoHideDuration={6000} onClose={closeErrorAlert} open={visibleError}>
                        <Alert severity="error" variant="filled">
                            <AlertTitle> {t('error_login_title')} </AlertTitle>
                            {t('error_login_message')}
                        </Alert>
                    </Snackbar>
                </DialogContent>

                <DialogActions>
                    <Button onClick={closeDialog}>{t('cancel')}</Button>
                    <Button onClick={handleLogin}>{t('login')}</Button>
                </DialogActions>
            </Dialog>

            <Snackbar autoHideDuration={3000} onClose={closeSuccessAlert} open={visibleSuccess}>
                <Alert severity="success" variant="filled">
                {t('success_login')}
                </Alert>
            </Snackbar>
        </>
    );
};
