import {NavigationContainer} from "@react-navigation/native";
import RootStackNavigator from "./navigation/RootStackNavigator";
import {useState} from "react";
import {User} from "./models/User";
import {UserContext} from "./contexts/user";
import {RootSiblingParent} from 'react-native-root-siblings';

export default function App() {

    const [user, setUser] = useState<User | undefined>()

    return (
        <RootSiblingParent>
            <NavigationContainer>
                <UserContext.Provider value={{
                    user,
                    setUser
                }}>
                    <RootStackNavigator/>
                </UserContext.Provider>
            </NavigationContainer>
        </RootSiblingParent>
    );
}
