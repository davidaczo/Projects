import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { DetailScreenComponent } from './screens/detail-screen';
import { MapScreen } from './screens/map-screen';
import { UsersScreen } from './screens/users-screen';
import { ScientistScreen } from './screens/scientist-screen';
import { CountriesScreen } from './screens/countries-screen';
import { LocationScreen } from './screens/location-screen'
import { SpeciesScreen } from './screens/species-screen'
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { AdminScreen } from './screens/admin-screen';

const obmTheme = createTheme({
    palette: {
        type: 'dark',
        primary: {
            main: '#AB6230',
        },
        secondary: {
            main: '#BABD61',
        },
    },
});

const App = function () {
    return (
        <ThemeProvider theme={obmTheme}>
            <Router>
                <Switch>
                    <Route component={MapScreen} exact path="/" />
                    <Route component={DetailScreenComponent} exact path="/detailed/:observationId" />
                    <Route component={UsersScreen} exact path="/users" />
                    <Route component={AdminScreen} exact path="/admin" />
                    <Route component={ScientistScreen} exact path="/scientist" />
                    <Route component={CountriesScreen} exact path="/countries" />
                    <Route component={LocationScreen} exact path="/locations" />
                    <Route component={SpeciesScreen} exact path="/species" />
                </Switch>
            </Router>
        </ThemeProvider>
    );
}

export default App;
