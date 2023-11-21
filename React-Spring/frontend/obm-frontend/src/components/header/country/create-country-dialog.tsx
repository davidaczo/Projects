import React, { useState, useCallback } from 'react';
import { checkCountry, checkIfCountryExists } from './country-validation';
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
import { insertCountry } from '../../../api/country-api';
import { useTranslation } from 'react-i18next';

type Props = {
    visible: boolean;
    closeDialog: () => void;
};

export const CreateCountryDialog = ({ visible, closeDialog }: Props) => {
    const { t } = useTranslation();
    const [visibleError, setVisibleError] = useState(false);
    const [visibleSuccess, setVisibleSuccess] = useState(false);

    const closeErrorAlert = useCallback(() => setVisibleError(false), []);
    const closeSuccessAlert = useCallback(() => setVisibleSuccess(false), []);

    const [countryName, setCountryName] = useState('');

    const onChangeTextField = useCallback((event) => {
        setCountryName(event.target.value);
    }, []);

    const handleCreateCountry = useCallback(async () => {
        if (!checkCountry(countryName)) {
            setVisibleError(true);
            return;
        }

        if (await checkIfCountryExists(countryName)) {
            setVisibleError(true);
            return;
        }

        setVisibleSuccess(true);

        closeDialog();
        insertCountry(countryName);
        return;
    }, [closeDialog, countryName]);

    return (
        <>
            <Dialog fullWidth maxWidth="sm" onClose={closeDialog} open={visible}>
                <DialogTitle>{t('create_country')}</DialogTitle>

                <DialogContent>
                    <TextField
                        fullWidth
                        id="country"
                        label="Country"
                        margin="dense"
                        onChange={onChangeTextField}
                        type="text"
                        variant="standard"
                    />

                    <Snackbar autoHideDuration={6000} onClose={closeErrorAlert} open={visibleError}>
                        <Alert severity="error" variant="filled">
                            <AlertTitle>{t('incorrect_country_name')}</AlertTitle>
                            {t('error_country_message')}
                        </Alert>
                    </Snackbar>
                </DialogContent>

                <DialogActions style={{ justifyContent: 'space-between' }}>
                    <Button onClick={closeDialog}>{t('cancel')}</Button>
                    <Button color="primary" onClick={handleCreateCountry}>
                        {t('create_country')}
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar autoHideDuration={3000} onClose={closeSuccessAlert} open={visibleSuccess}>
                <Alert severity="success" variant="filled">
                    {t('success_country_message')}
                </Alert>
            </Snackbar>
        </>
    );
};
