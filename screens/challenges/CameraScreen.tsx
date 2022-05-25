import {useContext, useEffect, useState} from "react";
import {Camera, CameraCapturedPicture, CameraType} from "expo-camera";
import {Dimensions, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Colors} from "../../services/constants";
import {participateToChallenge} from "../../repositories/challenge_repository";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {Challenge} from "../../models/Challenge";
import {UserContext} from "../../contexts/user";
import {UserContextType} from "../../services/types";
import {getByApiToken} from "../../repositories/auth_repository";

const CameraScreen = ({navigation, route}: NativeStackScreenProps<any>) => {

    const challenge: Challenge = route.params?.challenge

    const { user, setUser } = useContext<UserContextType>(UserContext)

    const [hasPermission, setHasPermission] = useState<boolean|null>(null)
    const [type, setType] = useState<CameraType>(CameraType.back)
    const [camera, setCamera] = useState<Camera|null>(null)
    const [previewVisible, setPreviewVisible] = useState(false)
    const [capturedImage, setCapturedImage] = useState<CameraCapturedPicture|null>(null)

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })()
    }, [])

    const takePicture = async () => {
        if (!camera) return;

        const photo = await camera.takePictureAsync({base64: true})
        setPreviewVisible(true)
        setCapturedImage(photo)
    }

    const retry = () => {
        setCapturedImage(null)
        setPreviewVisible(false)
    }

    const send = () => {
        if(capturedImage) {
            participateToChallenge({challenge_id: challenge.id, picture: capturedImage}, user?.apiToken!).then(response => {
                getByApiToken(user?.apiToken!).then(response => {
                    if(typeof response !== 'string') {
                        setUser(response)
                        navigation.replace("Challenges")
                    } else {
                        console.error(response)
                    }
                })
            }).catch(error => {
                console.error(error.message)
            })
        }
    }

    if (hasPermission === null) {
        return <View />;
    }
    if (!hasPermission) {
        return <Text>No access to camera</Text>;
    }
    if(previewVisible && capturedImage) {
        return (
            <View
                style={{
                    backgroundColor: 'transparent',
                    flex: 1,
                    width: '100%',
                    height: '100%'
                }}
            >
                <ImageBackground
                    source={{uri: capturedImage && capturedImage.uri}}
                    style={{
                        flex: 1
                    }}
                />
                <TouchableOpacity style={{
                    position: "absolute",
                    bottom: 20,
                    left: 20,
                    padding: 10,
                    borderRadius: 15,
                    backgroundColor: Colors.white
                }} onPress={send}>
                    <Text>Envoyer</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    position: "absolute",
                    bottom: 20,
                    right: 20,
                    padding: 10,
                    borderRadius: 15,
                    backgroundColor: Colors.white
                }} onPress={retry}>
                    <Text>Réessayer</Text>
                </TouchableOpacity>
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <Camera style={styles.camera} type={type} ref={(ref) => setCamera(ref)}  />
            <TouchableOpacity style={styles.buttonTakePicture} onPress={takePicture}/>
            <TouchableOpacity style={styles.buttonChangeView} onPress={() => setType(type === CameraType.back ? CameraType.front : CameraType.back)}>
                <Image style={styles.icon} source={require("../../assets/icons/refresh.png")} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%'
    },
    camera: {
        height: '100%'
    },
    buttonTakePicture: {
        width: 75,
        height: 75,
        position: "absolute",
        bottom: 20,
        left: (Dimensions.get("window").width-75)/2,
        backgroundColor: 'white',
        borderRadius: 100
    },
    buttonChangeView: {
        width: 50,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: 35,
        right: 20,
        backgroundColor: 'white',
        borderRadius: 100
    },
    icon: {
        width: 25,
        height: 25,
    }
})

export default CameraScreen
