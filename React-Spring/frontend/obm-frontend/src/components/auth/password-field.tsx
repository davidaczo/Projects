import React, { useState, useCallback } from 'react';
import {
    Button,
    Input,
    InputAdornment,
    InputLabel,
    FormControl,
} from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import loginData from '../../Store/login-data';
import { useTranslation } from 'react-i18next';

export const PasswordField = () => {
    const { t } = useTranslation();
    const [passwordShown, setPasswordShown] = useState(false);

    const togglePassword = useCallback(() => { 
        setPasswordShown((originalValue) => !originalValue)
    }, []);

    return (
        <FormControl fullWidth>
            <InputLabel htmlFor="standard-adornment-password">{t('password')}</InputLabel>
            <Input
                endAdornment={
                    <InputAdornment position="end">
                        <Button onClick={togglePassword} startIcon={!passwordShown ? (<VisibilityIcon />) : (<VisibilityOffIcon />)} />
                    </InputAdornment>
                }
                fullWidth
                id="standard-adornment-password"
                margin="dense"
                // eslint-disable-next-line react/jsx-no-bind
                onChange={(e) => loginData.setPassword(e.target.value)}
                type={passwordShown ? "text" : "password"}
            />
        </FormControl>
    )
}