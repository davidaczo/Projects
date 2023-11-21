import { Stack } from 'expo-router';

const StackLayout = () => {
    return (
        <Stack>
            <Stack.Screen 
                name="index"
                options={{
                    headerTitle: 'History Screen'
                }}
            />
        </Stack>
    )
}

export default StackLayout;