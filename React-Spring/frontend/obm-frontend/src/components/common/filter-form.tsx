import {
    Accordion,
    makeStyles,
    AccordionSummary,
    AccordionDetails,
    Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FilterBySpeciesNameComponent } from '../species-filter/filter-species-name-component';

const useStyles = makeStyles({
    filterElement: {
        boxShadow: '1',
        display: 'flex',
        flexDirection: 'column',
    },
});

export const FilterForm = () => {
    const classes = useStyles();
    const {t} = useTranslation();
   
    return (
        <Accordion className={classes.filterElement}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1">
                    {t('species_name')}
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <FilterBySpeciesNameComponent />
            </AccordionDetails>
        </Accordion>
    );
};
