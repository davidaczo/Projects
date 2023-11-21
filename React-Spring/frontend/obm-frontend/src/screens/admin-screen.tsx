import { Box, Tab, Tabs } from '@material-ui/core';
import React, { useCallback, useState } from 'react';
import { ObmAppBar } from '../components/header/obm-app-bar';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import GpsNotFixedIcon from '@material-ui/icons/GpsNotFixed';
import { UserTable } from '../components/table/users/users-table';
import { ObservationsTable } from '../components/table/observations/observations-table';
import PublicIcon from '@material-ui/icons/Public';
import { CountriesTable } from '../components/table/countries/countries-table';

export const AdminScreen = () => {
    const [value, setValue] = useState('users');

    const handleChange = useCallback ((_event: unknown, newValue: string) => {
        setValue(newValue);
    },[]);
    
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ width: '100%', height: '100%' }}>
                <ObmAppBar />
            </Box>
            <Box
                sx={{ justifyContent:'center' ,alignContent: "center" }}
            >
                <Tabs
                    indicatorColor="secondary"
                    onChange={handleChange}
                    value={value}
                >
                    <Tab icon={<PersonPinIcon />} label="Users" value="users" />
                    <Tab icon={<GpsNotFixedIcon/>}label="Observations" value="observations" />
                    <Tab icon={<PublicIcon/>} label="Countries" value="countries" />
                </Tabs>
            </Box>
            <Box sx={{ width: '100%', height: '100%'}}>
                {value === "users" ? (
                    <UserTable />
                ) : (
                value == "observations" ? 
                    <ObservationsTable />
                :
                    <CountriesTable />
                )}
            </Box>
        </Box>
    );
};
