import React, { FC } from 'react';
import { Grid, Tooltip, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { useTranslation } from 'react-i18next';

type ClearButtonProps = {
    clearFilters: () => void;
};

export const ClearButton: FC<ClearButtonProps> = ({ clearFilters }) => {
    const {t} = useTranslation();
    const clear = t('clear_filter');
    return (
    <Grid container justifyContent="flex-end">
         <Tooltip title={clear} > 
            <IconButton onClick={clearFilters}>
                <DeleteIcon color="error" />
            </IconButton>
        </Tooltip>
    </Grid>
)};
