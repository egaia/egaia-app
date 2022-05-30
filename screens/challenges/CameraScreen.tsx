import {useContext, useEffect, useState} from "react";
import {Camera, CameraCapturedPicture, CameraType, FlashMode} from "expo-camera";
import {Dimensions, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Colors} from "../../services/constants";
import {participateToChallenge} from "../../repositories/challenge_repository";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {Challenge} from "../../models/Challenge";
import {UserContext} from "../../contexts/user";
import {UserContextType} from "../../services/types";
import {getByApiToken} from "../../repositories/auth_repository";
import Loader from "../../components/Loader";

const CameraScreen = ({navigation, route}: NativeStackScreenProps<any>) => {

    const challenge: Challenge = route.params?.challenge

    const {user, setUser} = useContext<UserContextType>(UserContext)

    const [loading, setLoading] = useState<boolean>(false)
    const [hasPermission, setHasPermission] = useState<boolean | null>(null)
    const [type, setType] = useState<CameraType>(CameraType.back)
    const [flash, setFlash] = useState<boolean>(false)
    const [camera, setCamera] = useState<Camera | null>(null)
    const [previewVisible, setPreviewVisible] = useState(false)
    const [capturedImage, setCapturedImage] = useState<CameraCapturedPicture | null>(null)

    useEffect(() => {
        (async () => {
            const {status} = await Camera.requestCameraPermissionsAsync();
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
        setLoading(true)
        if (capturedImage) {
            participateToChallenge({
                challenge_id: challenge.id,
                picture: capturedImage
            }, user?.apiToken!).then(response => {
                getByApiToken(user?.apiToken!).then(response => {
                    setUser(response)
                    setLoading(false)
                    navigation.replace("Challenges")
                }).catch(() => setLoading(false))
            }).catch(() => setLoading(false))
        }
    }

    if (hasPermission === null) {
        return <View/>;
    }
    if (!hasPermission) {
        return <Text>No access to camera</Text>;
    }
    if (previewVisible && capturedImage) {
        return (
            <View
                style={{
                    backgroundColor: 'transparent',
                    flex: 1,
                    width: '100%',
                    height: '100%'
                }}
            >
                {loading && <Loader/>}
                <ImageBackground
                    source={{uri: capturedImage && capturedImage.uri}}
                    style={{
                        flex: 1
                    }}
                />
                <TouchableOpacity style={{
                    position: "absolute",
                    zIndex: 10,
                    bottom: 25,
                    left: 20,
                    width: 90,
                    height: 40,
                    padding: 10,
                    borderRadius: 15,
                    backgroundColor: Colors.white,
                    justifyContent: "center",
                    alignItems: "center"
                }} onPress={retry}>
                    <Text style={{textAlign: "center"}}>Réessayer</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    position: "absolute",
                    zIndex: 10,
                    bottom: 25,
                    right: 20,
                    width: 90,
                    height: 40,
                    padding: 10,
                    borderRadius: 15,
                    backgroundColor: Colors.white,
                    justifyContent: "center",
                    alignItems: "center"
                }} onPress={send}>
                    <Text style={{textAlign: "center"}}>Envoyer</Text>
                </TouchableOpacity>
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <Camera style={styles.camera} type={type} ref={(ref) => setCamera(ref)}
                    flashMode={flash ? FlashMode.on : FlashMode.off}/>
            <TouchableOpacity style={[styles.buttonFlash, flash ? styles.flashActive : styles.flashInactive]}
                              onPress={() => setFlash(!flash)}>
                <Image style={[styles.icon, flash ? styles.iconFlashActive : styles.iconFlashInactive]}
                       source={require("../../assets/icons/bolt.png")}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonTakePicture} onPress={takePicture}>
                <View style={styles.buttonTakePictureInterior}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonChangeView}
                              onPress={() => setType(type === CameraType.back ? CameraType.front : CameraType.back)}>
                <Image style={styles.icon} source={require("../../assets/icons/refresh.png")}/>
            </TouchableOpacity>
            <View style={styles.bottomView}/>
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
        width: 65,
        height: 65,
        position: "absolute",
        zIndex: 10,
        bottom: 15,
        left: (Dimensions.get("window").width - 65) / 2,
        backgroundColor: 'white',
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center"
    },
    buttonTakePictureInterior: {
        width: 58,
        height: 58,
        backgroundColor: 'white',
        borderRadius: 100,
        borderWidth: 2
    },
    buttonChangeView: {
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        zIndex: 10,
        bottom: 15 + (65 - 40) / 2,
        right: 20,
        backgroundColor: 'white',
        borderRadius: 100
    },
    buttonFlash: {
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        zIndex: 10,
        top: 40,
        left: 20,
        borderRadius: 100
    },
    flashActive: {
        backgroundColor: 'yellow',

    },
    flashInactive: {
        backgroundColor: Colors.white,
        borderWidth: 1,
        borderColor: Colors.black
    },
    iconFlashActive: {
        tintColor: Colors.black
    },
    iconFlashInactive: {
        tintColor: Colors.black
    },
    bottomView: {
        width: '100%',
        height: 15 + 65 + 15,
        position: "absolute",
        zIndex: 0,
        bottom: 0,
        backgroundColor: '#000000CC'
    },
    icon: {
        width: 20,
        height: 20,
    }
})

export default CameraScreen
