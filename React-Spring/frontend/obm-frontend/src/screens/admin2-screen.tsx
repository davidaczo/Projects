/* eslint-disable react/jsx-no-bind */
import React, { useCallback, useState } from 'react'
// eslint-disable-next-line import/no-unresolved
// import ReactPageScroller from 'react-page-scroller';
import { Box, makeStyles, Tab, Tabs } from '@material-ui/core';
// import { UserTable } from '../components/table/users/users-table';
// import { ObservationsTable } from '../components/table/observations/observations-table';
// import { CountriesTable } from '../components/table/countries/countries-table';
import { ObmAppBar } from '../components/header/obm-app-bar';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import GpsNotFixedIcon from '@material-ui/icons/GpsNotFixed';
import PublicIcon from '@material-ui/icons/Public';

const useStyles = makeStyles({
    indicator: {
        background: "none"
    },
    tabs: {
        "& button[aria-selected='true']": {
            width: "300px",
            height: "30px",
            backgroundColor: "#BABD61",
            float: "right",
            transition: "width 1s, background-color 1s"
        },
        "& button[aria-selected='false']": {
            width: "100px",
            height: "30px",
            backgroundColor: "white",
            float: "left",
            transition: "width 1s, background-color 1s"
        }
    }
});
const Admin2screen = () => {
    const [value, setValue] = useState(0);
    const classes = useStyles();
    const handleChange = useCallback((_event: unknown, newValue: number) => {
        setValue(newValue);
    }, []);

    const handleChange2 = useCallback((newValue: number) => {
        setValue(newValue);
    }, []);
    // const handlePageChange = (number: any) => {
    //     console.log(number)
    // };

    const handleBeforePageChange = (number: any) => {
        console.log(number);
    };

    return (
        <Box sx={{ display: "flex", justifyContent: "center" }} >
            <Box sx={{ bgcolor: "white", width: "100%", position: "absolute", zIndex: 1000 }}>
                <Box>
                    <ObmAppBar />
                </Box>
                <Box sx={{ bgcolor: 'white' }}>
                    <Tabs
                        centered
                        className={classes.tabs}
                        classes={{ indicator: classes.indicator }}
                        indicatorColor="secondary"
                        onChange={handleChange}
                        value={value}
                    >
                        <Tab icon={<PersonPinIcon />} label="Users" value={0} />
                        <Tab icon={<GpsNotFixedIcon />} label="Observations" value={1} />
                        <Tab icon={<PublicIcon />} label="Countries" value={2} />
                    </Tabs>
                </Box>
            </Box>
            <Box  >
                {/* sx={{ bgcolor: '#BABD61' }} */}
                {/* <ReactPageScroller
                    animationTimer={500}
                    containerHeight={window.innerHeight}
                    containerWidth={window.innerWidth}
                    customPageNumber={value}
                    onBeforePageScroll={handleBeforePageChange}
                    pageOnChange={handleChange2}
                    renderAllPagesOnFirstRender
                >
                    <Box color="#BABD61" flexDirection="column">
                        <UserTable />
                    </Box>

                    <Box color="white" flexDirection="column">
                        <ObservationsTable />
                    </Box>
                    <Box color="white" flexDirection="column">
                        <CountriesTable />
                    </Box>
                </ReactPageScroller> */}
            </Box>
        </Box >
    )
}

export default Admin2screen