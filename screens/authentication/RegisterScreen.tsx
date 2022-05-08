import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
} from "react-native";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {AuthParamList} from "../../services/types";
import EgaiaContainer from "../../components/EgaiaContainer";
import {useState} from "react";
import {ErrorMessage, Formik} from "formik";
import {SafeAreaView} from "react-native-safe-area-context";
import * as yup from 'yup';
import RNDateTimePicker from "@react-native-community/datetimepicker";

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
        .min(8, ({ min }) => `Le mot de passe doit contenir au minimum ${min} caractères`)
        .required('Le mot de passe est requis'),
    confirmPassword: yup.string()
        .min(8, ({ min }) => `Le mot de passe doit contenir au minimum ${min} caractères`)
        .required('La vérification du mot de passe est requise')
        .oneOf([yup.ref('password')], 'Le mot de passe ne correspond pas')
})

export default function RegisterScreen({navigation}: NativeStackScreenProps<AuthParamList, "Register">) {

    const [firstname, setFirstname] = useState<string>()
    const [lastname, setLastname] = useState<string>()
    const [birthDate, setBirthDate] = useState<string>()
    const [email, setEmail] = useState<string>()
    const [password, setPassword] = useState<string>()
    const [confirmPassword, setConfirmPassword] = useState<string>()

    const [showDatePicker, setShowDatePicker] = useState<boolean>(false)

    const handleSubmit = () => {
        console.log(firstname, lastname, birthDate, email, password, confirmPassword)
    }

    return (
        <EgaiaContainer withAppBar={true}>
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
                    }}
                >
                    {(props) => {
                        return (
                            <SafeAreaView>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Prénom"
                                    onChangeText={props.handleChange('firstname')}
                                    value={props.values.firstname}
                                    onBlur={props.handleBlur('firstname')}
                                />
                                <Text style={styles.inputError}>{props.touched.firstname && props.errors.firstname}</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Nom"
                                    onChangeText={props.handleChange('lastname')}
                                    value={props.values.lastname}
                                    onBlur={props.handleBlur('lastname')}
                                />
                                <Text style={styles.inputError}>{props.touched.lastname && props.errors.lastname}</Text>
                                <Text>Date de naissance</Text>
                                <RNDateTimePicker
                                    mode="date"
                                    value={props.values.birthdate}
                                    onChange={(event, date) => props.setFieldValue('birthdate', date)}
                                    dateFormat="day month year"
                                />
                                <ErrorMessage name="birthdate" />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Email"
                                    onChangeText={props.handleChange('email')}
                                    value={props.values.email}
                                    keyboardType={"email-address"}
                                    onBlur={props.handleBlur('email')}
                                />
                                <Text style={styles.inputError}>{props.touched.email && props.errors.email}</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Mot de passe"
                                    secureTextEntry={true}
                                    onChangeText={props.handleChange('password')}
                                    value={props.values.password}
                                    onBlur={props.handleBlur('password')}
                                />
                                <Text style={styles.inputError}>{props.touched.password && props.errors.password}</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Confirmation Mot de passe"
                                    secureTextEntry={true}
                                    onChangeText={props.handleChange('confirmPassword')}
                                    value={props.values.confirmPassword}
                                    onBlur={props.handleBlur('confirmPassword')}
                                />
                                <Text style={styles.inputError}>{props.touched.confirmPassword && props.errors.confirmPassword}</Text>
                                <TouchableOpacity style={styles.button} onPress={() => props.handleSubmit()}>
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

const styles = StyleSheet.create({
    input: {
        borderStyle: "solid",
        borderColor: "black",
        borderWidth: 2,
        height: 45,
        margin: 20,
    },
    button: {
        backgroundColor: "black",
        paddingVertical: 15,
        margin: 20
    },
    inputError: {
        fontSize: 10,
        color: "crimson",
        fontWeight: "bold"
    }
})
