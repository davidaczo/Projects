import { Redirect } from 'expo-router'
import { Provider } from 'mobx-react';
const App = () => {
    return (
        <Redirect href="/home" />
    )
}

export default App;