import React, { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next'
import CloseIcon from '@material-ui/icons/Close';
import { Drawer, IconButton, Divider, Button, Grid } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { FilterForm } from './filter-form';
import { DateFilterContainer } from '../date-filter/date-filter-container';
import { SpatialFilterContainerObserver } from './spatial-filter-container';
import dataPointsStore from '../../Store/data-points';

const drawerWidth = '25%';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
        },
        drawerPaper: {
            width: drawerWidth,
            padding: theme.spacing(0, 1),
        },
        buttons: {
            flex: 1,
        },
    })
);

type DrawerComponentType = {
    open: boolean;
    toggleDrawer: () => void;
};

export const DrawerComponent: FC<DrawerComponentType> = ({
    open,
    toggleDrawer,
}: DrawerComponentType) => {
    const { t } = useTranslation()
    const classes = useStyles();

    const filterByFields = useCallback(() => {
        dataPointsStore.loadData();
    }, []);

    return (
        <Drawer
            anchor="left"
            className={classes.drawer}
            classes={{
                paper: classes.drawerPaper,
            }}
            open={open}
            variant="persistent"
        >
            <Grid alignItems="center" container justifyContent="flex-end">
                <IconButton onClick={toggleDrawer}>
                    <CloseIcon />
                </IconButton>
            </Grid>
            <Divider />

            <FilterForm />
            <DateFilterContainer />
            <SpatialFilterContainerObserver />

            <Grid alignItems="flex-start" container justifyContent="flex-start" spacing={2}>
                <Grid container item xs={12}>
                    <Button
                        className={classes.buttons}
                        color="primary"
                        onClick={filterByFields}
                        size="large"
                        startIcon={<SearchIcon />}
                        variant="contained"
                    >
                      {t('find')}
                    </Button>
                </Grid>
            </Grid>
        </Drawer>
    );
};
