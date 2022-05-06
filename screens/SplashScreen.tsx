import {SafeAreaView} from "react-native-safe-area-context";
import {Text} from "react-native";
import {useEffect} from "react";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootParamList} from "../services/types";

export default function SplashScreen({navigation}: NativeStackScreenProps<RootParamList, "Splash">) {

    useEffect(() => {
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
