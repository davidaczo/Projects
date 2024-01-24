import { Redirect } from 'expo-router'
import { useEffect } from 'react';
import NavigationBarColor from 'react-native-navigation-bar-color';
import { COLORS } from '../constants';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import * as NavigationBar from 'expo-navigation-bar';


const App = () => {
    return (
        <Redirect href="/home" />
    )
}

export default App;