import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
} from "react-native";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {useState} from "react";
import {ErrorMessage, Formik} from "formik";
import {SafeAreaView} from "react-native-safe-area-context";
import * as yup from 'yup';
import RNDateTimePicker from "@react-native-community/datetimepicker";
import EgaiaContainer from "../../components/EgaiaContainer";
import {registerUser} from "../../repositories/auth_repository";
import {UserDTO} from "../../models/DTO/UserDTO";
import {saveUserInLocalStorage} from "../../store/reducers/user.reducer";
import {useDispatch} from "react-redux";
import {saveUser} from "../../store/actions/user.actions";
import {formsStyle} from "../../assets/styles/forms.style";

type FormValues = {
    firstname: string,
    lastname: string,
    birthdate: Date,
    email: string,
    password: string,
    confirmPassword: string
}

const RegisterSchema = yup.object({
    firstname: yup.string()
        .required('Le prénom est requis'),
    lastname: yup.string()
        .required('Le nom est requis'),
    birthdate: yup
        .date()
        .required('La date de naissance est requise'),
    email: yup.string()
        .email('L\'email est invalide')
        .required('L\'email est requis'),
    password: yup.string()
        .min(8, ({min}) => `Le mot de passe doit contenir au minimum ${min} caractères`)
        .required('Le mot de passe est requis'),
    confirmPassword: yup.string()
        .min(8, ({min}) => `Le mot de passe doit contenir au minimum ${min} caractères`)
        .required('La vérification du mot de passe est requise')
        .oneOf([yup.ref('password')], 'Le mot de passe ne correspond pas')
})

export default function RegisterScreen({navigation}: NativeStackScreenProps<any>) {

    const [showDatePicker, setShowDatePicker] = useState<boolean>(false)

    const dispatch = useDispatch()

    const registerUser = (values: FormValues) => {
        const userDTO: UserDTO = {
            firstname: values.firstname,
            lastname: values.lastname,
            birthdate: values.birthdate.toISOString(),
            email: values.email,
            password: values.password
        }
        console.log(userDTO)
        registerUser(userDTO).then(user => {
            if (typeof (user) === 'object') {
                console.log('registeredUser', user)
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
                <Text style={{fontSize: 40}}>S'enregistrer</Text>

                <Formik
                    validationSchema={RegisterSchema}
                    initialValues={{
                        firstname: '',
                        lastname: '',
                        birthdate: new Date(),
                        email: '',
                        password: '',
                        confirmPassword: '',
                    }}
                    onSubmit={(values, actions) => {
                        console.log(values)
                        registerUser(values)
                    }}
                >
                    {(props) => {
                        return (
                            <SafeAreaView>
                                <TextInput
                                    style={formsStyle.input}
                                    placeholder="Prénom"
                                    onChangeText={props.handleChange('firstname')}
                                    value={props.values.firstname}
                                    onBlur={props.handleBlur('firstname')}
                                />
                                <Text
                                    style={formsStyle.inputError}>{props.touched.firstname && props.errors.firstname}</Text>
                                <TextInput
                                    style={formsStyle.input}
                                    placeholder="Nom"
                                    onChangeText={props.handleChange('lastname')}
                                    value={props.values.lastname}
                                    onBlur={props.handleBlur('lastname')}
                                />
                                <Text
                                    style={formsStyle.inputError}>{props.touched.lastname && props.errors.lastname}</Text>
                                <Text>Date de naissance</Text>
                                <RNDateTimePicker
                                    mode="date"
                                    value={props.values.birthdate}
                                    onChange={(event, date) => props.setFieldValue('birthdate', date)}
                                    dateFormat="day month year"
                                />
                                <ErrorMessage name="birthdate"/>
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
                                <TextInput
                                    style={formsStyle.input}
                                    placeholder="Confirmation Mot de passe"
                                    secureTextEntry={true}
                                    onChangeText={props.handleChange('confirmPassword')}
                                    value={props.values.confirmPassword}
                                    onBlur={props.handleBlur('confirmPassword')}
                                />
                                <Text
                                    style={formsStyle.inputError}>{props.touched.confirmPassword && props.errors.confirmPassword}</Text>
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

const styles = StyleSheet.create({})
