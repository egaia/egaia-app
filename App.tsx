import {NavigationContainer} from "@react-navigation/native";
import RootStackNavigator from "./navigation/RootStackNavigator";
import {useState} from "react";
import {User} from "./models/User";
import {UserContext} from "./contexts/user";
import {LoaderContext} from "./contexts/loader";

export default function App() {

    const [user, setUser] = useState<User | undefined>()
    const [loading, setLoading] = useState<boolean>(false)

    return (
        <NavigationContainer>
            <UserContext.Provider value={{
                user,
                setUser
            }}>
                <LoaderContext.Provider value={{loading, setLoading}}>
                    <RootStackNavigator/>
                </LoaderContext.Provider>
            </UserContext.Provider>
        </NavigationContainer>
    );
}
