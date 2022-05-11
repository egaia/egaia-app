import {ScrollView, Text, TextInput, TouchableOpacity, View} from "react-native";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import EgaiaContainer from "../../components/EgaiaContainer";
import {Formik} from "formik";
import {SafeAreaView} from "react-native-safe-area-context";
import {formsStyle} from "../../assets/styles/forms.style";
import * as yup from "yup";
import {useDispatch} from "react-redux";
import {login} from "../../repositories/auth_repository";
import {saveUserInLocalStorage} from "../../store/reducers/user.reducer";
import {saveUser} from "../../store/actions/user.actions";

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
    const dispatch = useDispatch()

    const loginUser = (values: FormValues) => {
        console.log(values)
        login(values.email, values.password).then(user => {
            if (typeof (user) === 'object') {
                console.log('loginUser', user)
                saveUserInLocalStorage(user.apiToken).then(() => {
                    dispatch(saveUser(user))
                    navigation.navigate("Tabs")
                }).catch(error => {
                    console.error(error)
                })
            } else {
                console.error(user)
            }
        }).catch(error => {
            console.error(error)
        })
    }

    return (
        <EgaiaContainer>
            <ScrollView>
                <Text style={{fontSize: 40}}>Se connecter</Text>

                <Formik
                    validationSchema={LoginSchema}
                    initialValues={{
                        email: '',
                        password: '',
                    }}
                    onSubmit={(values, actions) => {
                        console.log(values)
                        loginUser(values)
                    }}
                >
                    {(props) => {
                        return (
                            <SafeAreaView>
                                <TextInput
                                    style={formsStyle.input}
                                    placeholder="Email"
                                    onChangeText={props.handleChange('email')}
                                    value={props.values.email}
                                    keyboardType={"email-address"}
                                    onBlur={props.handleBlur('email')}
                                />
                                <Text style={formsStyle.inputError}>{props.touched.email && props.errors.email}</Text>
                                <TextInput
                                    style={formsStyle.input}
                                    placeholder="Mot de passe"
                                    secureTextEntry={true}
                                    onChangeText={props.handleChange('password')}
                                    value={props.values.password}
                                    onBlur={props.handleBlur('password')}
                                />
                                <Text
                                    style={formsStyle.inputError}>{props.touched.password && props.errors.password}</Text>
                                <TouchableOpacity style={formsStyle.button} onPress={() => props.handleSubmit()}>
                                    <Text style={{color: "white", textAlign: "center"}}>Continuer</Text>
                                </TouchableOpacity>
                            </SafeAreaView>
                        );
                    }}
                </Formik>
            </ScrollView>
        </EgaiaContainer>
    )
}
