import {SafeAreaView} from "react-native-safe-area-context";
import {Text} from "react-native";
import {useEffect} from "react";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootParamList} from "../services/types";
import {useDispatch, useSelector} from "react-redux";
import {getUser} from "../store/user/userSlice";
import {UserProviderState} from "../store/configureStore";

export default function SplashScreen({navigation}: NativeStackScreenProps<RootParamList, "Splash">) {

    const user = useSelector((state: UserProviderState) => state.userProvider.user)
    const dispatch = useDispatch()

    useEffect(() => {
        if(user.name === '') {
            console.log('pas de user')
            dispatch(getUser())
        } else {
            console.log('user good')
        }
        window.setTimeout(() => {
            navigation.navigate("Landing");
        }, 2000)
    }, [])

    return (
        <SafeAreaView style={{backgroundColor: '#57b454', height: 1000}}>
            <Text style={{textAlign: 'center'}}>EGAIA</Text>
        </SafeAreaView>
    );
}
