import React, { useCallback, useEffect, useState } from 'react';
import { Box, Tab, Tabs } from '@material-ui/core';
import { ObmAppBar } from '../components/header/obm-app-bar';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import GpsNotFixedIcon from '@material-ui/icons/GpsNotFixed';
import { ScientistCard } from '../components/common/scientist-card';
import { ObservationsScreen } from '../screens/observations-screen';
import { User } from '../components/table/users/users';
import dataPointsStore from '../Store/data-points';
import { fetchAllUsers } from '../api/user-api';



export const ScientistScreen = () => {
    const [value, setValue] = useState('one');
    const [loaded, setLoaded] = useState(false);
    const handleChange = useCallback((_event, newValue) => {
        setValue(newValue);
    }, []);


    const thisUsername = localStorage.getItem('username');
    console.log(thisUsername);
    const [thisUser,setThisUser] = useState<User>();
    dataPointsStore.loadAllObservations();
    useEffect(() => {
        (async () => {


            const users = await fetchAllUsers();
            console.log(users,);
            const loggedUser = users.filter((user: { username: string; }) => '"' + user.username + '"' === thisUsername);
            console.log(loggedUser);
            const scientist = loggedUser[0];
            setThisUser({
                id: scientist.id,
                role: scientist.role,
                firstName: scientist.firstName,
                lastName: scientist.lastName,
                username: scientist.username,
                dateOfBirth: scientist.dateOfBirth,
                email: scientist.email,
            })
            setLoaded(true);
        })()
        //return thisUser;
    }, [thisUsername]);

    if (!loaded) {
        return null;
    }
    console.log(thisUser)

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ width: '100%', height: '100%' }}>
                <ObmAppBar />
            </Box>
            <Box
                sx={{ justifyContent: 'center', alignContent: "center" }}
            >
                <Tabs
                    indicatorColor="secondary"
                    onChange={handleChange}
                    value={value}
                >
                    <Tab icon={<PersonPinIcon />} label="My data" value="one" />
                    <Tab icon={<GpsNotFixedIcon />} label="Observations" value="two" />
                </Tabs>
            </Box>
            <Box sx={{ width: '100%', height: '100%' }}>
                {value === "one" && thisUser ? (
                    <ScientistCard user={thisUser} />
                ) : <ObservationsScreen />}
            </Box>
        </Box>
    )
};