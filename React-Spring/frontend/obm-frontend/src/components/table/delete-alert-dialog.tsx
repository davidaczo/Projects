import React from 'react';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';

type Props = {
    visible: boolean;
    closeDialog: () => void;
    triggerDelete: () => void;
    item: string;
    id: number | string;
};

export const DeleteAlertDialog = ({ visible, closeDialog, triggerDelete, item, id }: Props) => {
    const { t } = useTranslation();

    const title = t('deleting_item', { item });

    return (
        <Dialog
            aria-describedby="alert-dialog-description"
            aria-labelledby="alert-dialog-title"
            onClose={closeDialog}
            open={visible}
        >
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {t('are_you_sure_delete', { id, item })} <br />
                    <br />
                    {t('Once deleted it cannot be recovered')}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button color="primary" onClick={closeDialog}>
                    {t('cancel')}
                </Button>
                <Button autoFocus color="primary" onClick={triggerDelete} variant="contained">
                    {t('delete')}
                </Button>
            </DialogActions>
        </Dialog>
    );
};
