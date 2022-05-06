import {NavigationContainer} from "@react-navigation/native";
import {SafeAreaProvider} from "react-native-safe-area-context";
import Navigation from "./navigation/navigation";
import {Provider} from "react-redux";
import {store} from "./store/configureStore";

export default function App() {

    return (
        <Provider store={store}>
            <SafeAreaProvider>
                <NavigationContainer>
                    <Navigation/>
                </NavigationContainer>
            </SafeAreaProvider>
        </Provider>
    );
}
