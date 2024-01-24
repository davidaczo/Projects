import { Stack } from 'expo-router'
import { useEffect } from 'react';
import * as NavigationBar from 'expo-navigation-bar';

const StackLayout = () => {
    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
    );
};

export default StackLayout;