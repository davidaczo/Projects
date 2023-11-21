import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    makeStyles,
    Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useTranslation } from 'react-i18next';
import React from 'react';
import { DateFilterComponent } from './date-filter-component';

const useStyles = makeStyles({
    filterElement: {
        boxShadow: '1',
        display: 'flex',
        flexDirection: 'column',
    },
});

export const DateFilterContainer = () => {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <Accordion className={classes.filterElement}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1">{t('date_filter')}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <DateFilterComponent />
            </AccordionDetails>
        </Accordion>
    );
};
