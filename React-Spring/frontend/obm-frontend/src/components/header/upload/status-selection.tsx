import React from 'react';
import { Grid, Typography, Radio, makeStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(() => ({
    typography: {
        fontSize: 15,
    },
}));

type Props = {
    selectedStatus: string,
    handleChange: (event: { target: { value: React.SetStateAction<string>; } }) => void,
};


export const StatusSelection = ( {selectedStatus,handleChange }: Props)  => {
     const { t } = useTranslation();
     const classes = useStyles();
    
    return (
        <>
            <Grid item>
                <Typography className={classes.typography} variant="subtitle2">
                    {t('Alive')}
                </Typography>
                <Radio
                    checked={selectedStatus === 'alive'}
                    inputProps={{ 'aria-label': 'alive' }}
                    name="radio-buttons"
                    onChange={handleChange}
                    value="alive"
                />
            </Grid>
            <Grid item>
                <Typography className={classes.typography} variant="subtitle2">
                    {t('Dead')}
                </Typography>
                <Radio
                    checked={selectedStatus === 'dead'}
                    inputProps={{ 'aria-label': 'dead' }}
                    name="radio-buttons"
                    onChange={handleChange}
                    value="dead"
                />
            </Grid>
        </>
    );
};
