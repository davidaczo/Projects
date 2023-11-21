import { Accordion, makeStyles, Typography, Switch, Box } from '@material-ui/core';
import { observer } from 'mobx-react';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import filterDataStore from '../../Store/filtering-data';

const useStyles = makeStyles({
    filterElement: {
        boxShadow: '1',
        display: 'flex',
        flexDirection: 'column',
    },

    boxContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: 15,
        marginRight: 5,
        height: 52,
    },
});

export const SpatialFilterContainer = () => {
    const classes = useStyles();
    const { t } = useTranslation();

    const setSpacialFilter = useCallback((event) => {
        console.log("setting spacialfilter", event.target.checked)
        filterDataStore.setSpatialFilterWithValue(event.target.checked)
    }, []);
    console.log("spatialfilter:", filterDataStore.spatialFilter)
    return (
        <Accordion className={classes.filterElement}>
            <Box className={classes.boxContainer}>
                <Typography variant="subtitle1">{t('spatial_filter')}</Typography>
                <Switch
                    checked={filterDataStore.spatialFilter}
                    onChange={setSpacialFilter}
                />
            </Box>
        </Accordion>
    );
};

export const SpatialFilterContainerObserver = observer(SpatialFilterContainer);