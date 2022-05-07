import {SafeAreaView} from "react-native-safe-area-context";
import {Text} from "react-native";
import {useEffect} from "react";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootParamList} from "../services/types";
import {useDispatch, useSelector} from "react-redux";
import {User} from "../models/User";

export default function SplashScreen({navigation}: NativeStackScreenProps<RootParamList, "Splash">) {

    const user = useSelector((state: User|null) => state)
    const dispatch = useDispatch()

    useEffect(() => {
        if(user === null) {
            console.log('pas de user')
        } else {
            console.log(user.name)
        }
        window.setTimeout(() => {
            navigation.navigate("Landing");
        }, 3000)
    }, [])

    return (
        <SafeAreaView style={{backgroundColor: '#57b454', height: 1000}}>
            <Text style={{textAlign: 'center'}}>EGAIA</Text>
        </SafeAreaView>
    );
}
