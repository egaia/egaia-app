import {Text} from "react-native";
import {useEffect} from "react";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {useDispatch} from "react-redux";
import {saveUser} from "../store/actions/user.actions";
import EgaiaContainer from "../components/EgaiaContainer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getByApiToken} from "../repositories/auth_repository";
import {Colors} from "../services/constants";

export default function SplashScreen({navigation}: NativeStackScreenProps<any>) {

    const dispatch = useDispatch()

    useEffect(() => {
        window.setTimeout(() => {
            AsyncStorage.getItem('api_token').then(value => {
                if (value) {
                    getByApiToken(value).then(user => {
                        if (typeof (user) === 'object') {
                            dispatch(saveUser(user))
                            navigation.navigate("Tabs")
                        } else {
                            console.error(user)
                        }
                    })
                } else {
                    navigation.navigate("Landing")
                }
            }).catch(error => {
                console.error(error)
                navigation.navigate("Landing")
            })
        }, 1000)
    }, [])

    return (
        <EgaiaContainer backgroundColor={Colors.primary}>
            <Text style={{textAlign: 'center'}}>EGAIA</Text>
        </EgaiaContainer>
    );
}
