import EgaiaContainer from "../../components/EgaiaContainer";
import {Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import PrimaryButton from "../../components/PrimaryButton";
import {formsStyle} from "../../assets/styles/forms.style";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import {ErrorMessage, Formik} from "formik";
import * as yup from "yup";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../../contexts/user";
import {UserContextType} from "../../services/types";
import {checkPassword, updateUser, UpdateUserData} from "../../repositories/auth_repository";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import * as ImagePicker from 'expo-image-picker';
import DatePicker from 'react-native-date-picker'

const UpdateProfileSchema = yup.object().shape({
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
        .when('newPassword', {
            is: (newPassword: any) => newPassword,
            then: yup.string().required("L'ancien mot de passe est requis")
        }),
    newPassword: yup.string()
        .min(8, ({min}) => `Le mot de passe doit contenir au minimum ${min} caractères`)
        .when('password', {
            is: (password: any) => password,
            then: yup.string().required("Le nouveau mot de passe est requis")
        }),
}, [
    ['password', 'newPassword']
])

type FormDataType = {
    firstname: string,
    lastname: string,
    birthdate: Date,
    email: string,
    password: string,
    newPassword: string
}

const UpdateProfileScreen = ({navigation}: NativeStackScreenProps<any>) => {

    const { user, setUser } = useContext<UserContextType>(UserContext)

    const [image, setImage] = useState<string|null>(null)
    const [openDate, setOpenDate] = useState<boolean>(false)

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [16,9],
            quality: 1,
        })

        console.log(result)

        if (!result.cancelled) {
            setImage(result.uri)
        }
    }

    const tryCheckPassword = (values: FormDataType) => {
        if(values.password.trim() !== '' && values.newPassword.trim() !== '') {
            checkPassword(values.password, user?.apiToken!).then(response => {
                tryUpdateUser(values)
            }).catch()
        } else {
            tryUpdateUser(values)
        }
    }

    const tryUpdateUser = (values: FormDataType) => {

        console.log('user', new Date(user?.birthdate!))
        console.log('form',new Date(values.birthdate.setDate(values.birthdate.getDate() + 1)))

        const data: UpdateUserData = {
            firstname: values.firstname !== user?.firstname ? values.firstname : null,
            lastname: values.lastname !== user?.lastname ? values.lastname : null,
            birthdate: values.birthdate.toISOString() !== new Date(user?.birthdate!).toISOString() ? new Date(values.birthdate.setDate(values.birthdate.getDate())).toISOString() : null,
            image,
            email: values.email !== user?.email ? values.email : null,
            password: values.newPassword.trim() !== '' ? values.newPassword : null
        }

        if(data.firstname === null
            && data.lastname === null
            && data.birthdate === null
            && data.image === null
            && data.email === null
            && data.password === null) return;


        updateUser(data, user?.apiToken!).then(result => {
            setUser(result)
            navigation.replace("Account")
        }).catch()
    }

    return (
        <EgaiaContainer>
            <ScrollView style={styles.scrollContainer}>
                <View style={styles.globalContainer}>
                    <View style={styles.profileInfoContainer}>
                        <Image style={styles.profilePicture} source={{uri: image ?? user?.image}} />
                        <TouchableOpacity onPress={pickImage}>
                            <Text>Changer la photo de profil</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.formContainer}>
                        <Formik
                            validationSchema={UpdateProfileSchema}
                            initialValues={{
                                firstname: user?.firstname!,
                                lastname: user?.lastname!,
                                birthdate: new Date(user?.birthdate!),
                                email: user?.email!,
                                password: '',
                                newPassword: '',
                            }}
                            onSubmit={(values, actions) => {
                                console.log(values)
                                tryCheckPassword(values)
                            }}
                        >
                            {(props) => {
                                return (
                                    <View>
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
                                        <TouchableOpacity onPress={() => setOpenDate(true)}>
                                            <Text>{props.values.birthdate.toLocaleDateString()}</Text>
                                        </TouchableOpacity>
                                        <DatePicker
                                            modal
                                            mode="date"
                                            locale="fr"
                                            title="Date de naissance"
                                            confirmText="Confirmer"
                                            cancelText="Annuler"
                                            open={openDate}
                                            onConfirm={(date) => {
                                                props.setFieldValue('birthdate', date)
                                                setOpenDate(false)
                                            }}
                                            onCancel={() => setOpenDate(false)}
                                            date={props.values.birthdate}
                                        />
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
                                            placeholder="Ancien mot de passe"
                                            secureTextEntry={true}
                                            onChangeText={props.handleChange('password')}
                                            value={props.values.password}
                                            onBlur={props.handleBlur('password')}
                                        />
                                        <Text
                                            style={formsStyle.inputError}>{props.touched.password && props.errors.password}</Text>
                                        <TextInput
                                            style={formsStyle.input}
                                            placeholder="Nouveau mot de passe"
                                            secureTextEntry={true}
                                            onChangeText={props.handleChange('newPassword')}
                                            value={props.values.newPassword}
                                            onBlur={props.handleBlur('newPassword')}
                                        />
                                        <Text style={formsStyle.inputError}>
                                            {props.touched.newPassword && props.errors.newPassword}
                                        </Text>
                                        <PrimaryButton text="Enregistrer les modifications" onPress={() => props.handleSubmit()} />
                                    </View>
                                );
                            }}
                        </Formik>
                    </View>
                </View>
            </ScrollView>
        </EgaiaContainer>
    )
}

const styles = StyleSheet.create({
    scrollContainer: {
        height: '100%',
        width: '100%'
    },
    globalContainer: {
        height: '100%',
        width: '100%',
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    profileInfoContainer: {
        width: '100%',
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 20
    },
    profilePicture: {
        width: 100,
        height: 100,
        borderRadius: 50
    },

    formContainer: {
        width: '100%'
    }
})

export default UpdateProfileScreen
