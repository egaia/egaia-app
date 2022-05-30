import {ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import EgaiaContainer from "../../components/EgaiaContainer";
import {Formik} from "formik";
import {formsStyle} from "../../assets/styles/forms.style";
import * as yup from "yup";
import {loginUser} from "../../repositories/auth_repository";
import {UserContext} from "../../contexts/user";
import {useContext, useState} from "react";
import {UserContextType} from "../../services/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PrimaryButton from "../../components/PrimaryButton";
import Loader from "../../components/Loader";

type FormValues = {
    email: string,
    password: string
}

const LoginSchema = yup.object({
    email: yup.string()
        .email('L\'email est invalide')
        .required('L\'email est requis'),
    password: yup.string()
        .min(8, ({min}) => `Le mot de passe doit contenir au minimum ${min} caractères`)
        .required('Le mot de passe est requis'),
})

export default function LoginScreen({navigation}: NativeStackScreenProps<any>) {

    const {setUser} = useContext<UserContextType>(UserContext)

    const [loading, setLoading] = useState<boolean>(false)

    const tryLoginUser = (values: FormValues) => {
        setLoading(true)
        loginUser(values.email, values.password).then(user => {
            if (user) {
                AsyncStorage.setItem('api_token', user.apiToken).then(() => {
                    setLoading(false)
                    setUser(user)
                    navigation.navigate("Tabs")
                }).catch(() => setLoading(false))
            } else {
                setLoading(false)
            }
        }).catch(() => setLoading(false))
    }

    return (
        <EgaiaContainer>
            <>{loading && <Loader/>}</>
            <ScrollView style={styles.container}>
                <Text style={{fontSize: 40, marginBottom: 15}}>Se connecter</Text>

                <Formik
                    validationSchema={LoginSchema}
                    initialValues={{
                        email: '',
                        password: '',
                    }}
                    onSubmit={(values, actions) => {
                        tryLoginUser(values)
                    }}
                >
                    {(props) => {
                        return (
                            <View style={styles.formContainer}>
                                <View style={formsStyle.inputContainer}>
                                    <Text style={formsStyle.inputText}>Email</Text>
                                    <TextInput
                                        style={formsStyle.input}
                                        onChangeText={props.handleChange('email')}
                                        value={props.values.email}
                                        keyboardType={"email-address"}
                                        onBlur={props.handleBlur('email')}
                                    />
                                    <Text style={formsStyle.inputError}>
                                        {props.touched.email && props.errors.email}
                                    </Text>
                                </View>

                                <View style={formsStyle.inputContainer}>
                                    <Text style={formsStyle.inputText}>Mot de passe</Text>
                                    <TextInput
                                        style={formsStyle.input}
                                        secureTextEntry={true}
                                        onChangeText={props.handleChange('password')}
                                        value={props.values.password}
                                        onBlur={props.handleBlur('password')}
                                    />
                                    <Text style={formsStyle.inputError}>
                                        {props.touched.password && props.errors.password}
                                    </Text>
                                </View>

                                <PrimaryButton text="Se connecter" onPress={() => props.handleSubmit()}/>
                            </View>
                        );
                    }}
                </Formik>
            </ScrollView>
        </EgaiaContainer>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
    },
    formContainer: {}
})
