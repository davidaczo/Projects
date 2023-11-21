import React, { useState, useCallback } from 'react';
import { Button } from '@material-ui/core';
import { CreateCountryDialog } from './create-country-dialog';
import { useTranslation } from 'react-i18next';

export const CreateCountry = () => {
    const { t } = useTranslation();
    const [visible, setVisible] = useState(false);

    const openDialog = useCallback(() => setVisible(true), []);
    const closeDialog = useCallback(() => setVisible(false), []);

    return (
        <>
            <Button color="inherit" onClick={openDialog}>
                {t('create_country')}
            </Button>
            <CreateCountryDialog closeDialog={closeDialog} visible={visible} />
        </>
    );
};
