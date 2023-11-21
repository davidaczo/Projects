/* eslint-disable react/require-default-props */
import React, { FC} from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import { IconButton, Toolbar, AppBar, makeStyles, Grid } from '@material-ui/core';
import { LoginObserver } from '../auth/login';
import { LanguagePickerIcon } from './language-picker/language-picker-icon';
import { HeaderButtonsObserver } from './header-buttons';
import { UploadObservationObserver } from './upload/upload-observation';
type DrawerComponentType = {
    toggleDrawer?: () => void;
};

const useStyles = makeStyles({
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
    },
});

export const ObmAppBar: FC<DrawerComponentType> = ({ toggleDrawer }) => {
    const classes = useStyles();
    return (
        <AppBar color="primary" id="headerNavBar" position="sticky">
            <Toolbar className={classes.toolbar}>
                <Grid container item>
                    {toggleDrawer !== undefined && (
                        <IconButton
                            aria-controls="simple-menu"
                            aria-haspopup="true"
                            aria-label="open drawer"
                            color="inherit"
                            edge="start"
                            onClick={toggleDrawer}
                        >
                            <MenuIcon />
                        </IconButton>
                    )}
                    <HeaderButtonsObserver />
                </Grid>
                <Grid container direction="row" item justifyContent="flex-end">
                    <UploadObservationObserver />
                    <LanguagePickerIcon />
                    <LoginObserver />
                </Grid>
            </Toolbar>
        </AppBar>
    );
};
