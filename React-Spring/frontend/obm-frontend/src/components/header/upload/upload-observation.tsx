import React, { useCallback, useState, FC } from 'react';
import {
    Button,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { UploadDialog } from './upload-dialog';
import { observer } from 'mobx-react';
import loginData from '../../../Store/login-data';


export const UploadObservation: FC = () => {
    const { t } = useTranslation();
    const [visible, setVisible] = useState(false);
    const openDialog = useCallback(() => setVisible(true), []);
    const closeDialog = useCallback(() => {
        setVisible(false)
    }, []);
    if(!loginData.isAdminUser() && !loginData.isScientistUser()) {
        return null;
        }
        return (
            <>
              <Button color="primary" 
                onClick={openDialog} 
                startIcon={<CloudUploadIcon />} 
                variant="contained">
                   {t('add_observation')}
              </Button>
              <UploadDialog
                closeDialog={closeDialog}
                visible={visible} />
            </>
        )
    
}


export const UploadObservationObserver = observer(UploadObservation);