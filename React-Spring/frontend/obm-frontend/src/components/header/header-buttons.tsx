import { Button } from '@material-ui/core'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next';

import MapIcon from '@material-ui/icons/Map';
import loginData from '../../Store/login-data'
import { CreateCountry } from './country/create-country'
import { observer } from 'mobx-react';

const HeaderButtons: FC = () => {
    const { t } = useTranslation();
    return (
        <>
            <Button color="inherit" href="/" startIcon={<MapIcon />}>
                {t('map')}
            </Button>
            {loginData.isAdminUser() ? (
                <>
                    <Button color="inherit" href="/admin">
                        {t('dashboard')}
                    </Button>
                    <CreateCountry />
                </>
            ) : null}
            {loginData.isScientistUser() ? (
                        <Button color="inherit" href="/scientist">
                            {t('dashboard')}
                        </Button>
                    ) : null}
        </>
    )
}

export const HeaderButtonsObserver = observer(HeaderButtons);
