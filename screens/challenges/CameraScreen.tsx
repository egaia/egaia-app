import {useEffect, useState} from "react";
import {Camera, CameraType} from "expo-camera";
import {Dimensions, ImageBackground, StyleSheet, Text, TouchableOpacity, View} from "react-native";

const CameraScreen = () => {
    const [hasPermission, setHasPermission] = useState<boolean|null>(null)
    const [type, setType] = useState<CameraType>(CameraType.back)
    const [camera, setCamera] = useState<Camera|null>(null)
    const [previewVisible, setPreviewVisible] = useState(false)
    const [capturedImage, setCapturedImage] = useState<any>(null)

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })()
    }, [])

    const takePicture = async () => {
        if (!camera) return;

        const photo = await camera.takePictureAsync()
        console.log(photo)
        setPreviewVisible(true)
        setCapturedImage(photo)
    }

    const retry = () => {
        setCapturedImage(null)
        setPreviewVisible(false)
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
                    left: 20
                }}>
                    <Text>Envoyer</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    position: "absolute",
                    bottom: 20,
                    right: 20
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
            <TouchableOpacity style={styles.buttonChangeView} onPress={() => setType(type === CameraType.back ? CameraType.front : CameraType.back)}/>
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
        width: 75,
        height: 75,
        position: "absolute",
        top: 20,
        right: 20,
        backgroundColor: 'white',
        borderRadius: 100
    }
})

export default CameraScreen
