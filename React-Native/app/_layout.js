import { Stack } from 'expo-router';
import { observer } from 'mobx-react';

const StackLayout = observer(() => {
    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
    );
});

export default StackLayout;