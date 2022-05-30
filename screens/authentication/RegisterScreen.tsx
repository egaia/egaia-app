import {
    KeyboardAvoidingView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity, View,
} from "react-native";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {useState} from "react";
import {Formik} from "formik";
import * as yup from 'yup';
import EgaiaContainer from "../../components/EgaiaContainer";
import {UserDTO} from "../../models/DTO/UserDTO";
import {formsStyle} from "../../assets/styles/forms.style";
import {registerUser} from "../../repositories/auth_repository";
import {useContext} from "react";
import {UserContextType} from "../../services/types";
import {UserContext} from "../../contexts/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PrimaryButton from "../../components/PrimaryButton";
import Loader from "../../components/Loader";
import DateTimePickerModal from "react-native-modal-datetime-picker";

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

    const {setUser} = useContext<UserContextType>(UserContext)

    const [loading, setLoading] = useState<boolean>(false)
    const [openDate, setOpenDate] = useState<boolean>(false)

    const tryRegisterUser = (values: FormValues) => {
        setLoading(true)
        const userDTO: UserDTO = {
            firstname: values.firstname,
            lastname: values.lastname,
            birthdate: values.birthdate.toISOString(),
            email: values.email,
            password: values.password
        }
        registerUser(userDTO).then(user => {
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
            {loading && <Loader />}
            <KeyboardAvoidingView behavior="padding" enabled keyboardVerticalOffset={10}>
                <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                    <Text style={{fontSize: 40, marginBottom: 15}}>S'enregistrer</Text>

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
                            tryRegisterUser(values)
                        }}
                    >
                        {(props) => {
                            return (
                                <View>
                                    <View style={formsStyle.inputContainer}>
                                        <Text style={formsStyle.inputText}>Prénom</Text>
                                        <TextInput
                                            style={formsStyle.input}
                                            onChangeText={props.handleChange('firstname')}
                                            value={props.values.firstname}
                                            onBlur={props.handleBlur('firstname')}
                                        />
                                        <Text style={formsStyle.inputError}>
                                            {props.touched.firstname && props.errors.firstname}
                                        </Text>
                                    </View>

                                    <View style={formsStyle.inputContainer}>
                                        <Text style={formsStyle.inputText}>Nom</Text>
                                        <TextInput
                                            style={formsStyle.input}
                                            onChangeText={props.handleChange('lastname')}
                                            value={props.values.lastname}
                                            onBlur={props.handleBlur('lastname')}
                                        />
                                        <Text style={formsStyle.inputError}>
                                            {props.touched.lastname && props.errors.lastname}
                                        </Text>
                                    </View>

                                    <View style={[formsStyle.inputContainer, {marginBottom: 15}]}>
                                        <Text style={formsStyle.inputText}>Date de naissance</Text>
                                        <TouchableOpacity style={[formsStyle.input, {justifyContent: "center"}]} onPress={() => setOpenDate(true)}>
                                            <Text style={{textAlignVertical: "center"}}>{props.values.birthdate.toLocaleDateString()}</Text>
                                        </TouchableOpacity>
                                        {/*@ts-ignore*/}
                                        <DateTimePickerModal
                                            mode="date"
                                            isVisible={openDate}
                                            onConfirm={(date) => {
                                                props.setFieldValue('birthdate', date)
                                                setOpenDate(false)
                                            }}
                                            onCancel={() => setOpenDate(false)}
                                            date={props.values.birthdate}
                                            locale={"fr_FR"}
                                            confirmTextIOS="Confirmer"
                                            cancelTextIOS="Annuler"
                                        />
                                    </View>

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

                                    <View style={formsStyle.inputContainer}>
                                        <Text style={formsStyle.inputText}>Vérification du mot de passe</Text>
                                        <TextInput
                                            style={formsStyle.input}
                                            secureTextEntry={true}
                                            onChangeText={props.handleChange('confirmPassword')}
                                            value={props.values.confirmPassword}
                                            onBlur={props.handleBlur('confirmPassword')}
                                        />
                                        <Text style={formsStyle.inputError}>
                                            {props.touched.confirmPassword && props.errors.confirmPassword}
                                        </Text>
                                    </View>

                                    <PrimaryButton text="Continuer" onPress={() => props.handleSubmit()} />
                                </View>
                            );
                        }}
                    </Formik>
                </ScrollView>
            </KeyboardAvoidingView>
        </EgaiaContainer>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
    },
    keyboardView: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center'
    },
})
