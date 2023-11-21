import { CssBaseline } from '@material-ui/core';
import React, { FC, useCallback, useState } from 'react';
import { ObmAppBar } from '../header/obm-app-bar';
import { DrawerComponent } from './drawer-component';

const ObmScreen: FC = ({ children }) => {
    const [drawerVisible, setDrawerVisible] = useState(false);

    const toggleDrawer = useCallback(() => {
        setDrawerVisible((visible) => !visible);
    }, []);

    return (
        <>
            <ObmAppBar toggleDrawer={toggleDrawer} />
            <DrawerComponent open={drawerVisible} toggleDrawer={toggleDrawer} />
            <CssBaseline />
            {children}
        </>
    );
};

export default ObmScreen;
