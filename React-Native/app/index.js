import { useState, useEffect } from 'react';
import { View, Text, ScrollView, SafeAreaView } from 'react-native'
import { Stack, useRouter, Redirect } from 'expo-router'

import store from "../redux/store"
import { Provider } from 'react-redux'

const App = () => {
    return (
        <Provider store={store}>
            <Redirect href="/home" />
        </Provider>
    )
}

export default App;