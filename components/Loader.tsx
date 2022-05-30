import {StyleSheet, View} from "react-native";
import LottieView from 'lottie-react-native';

const Loader = () => {
    return (
        <View style={styles.container}>
            <LottieView
                style={styles.loader}
                source={require("../assets/lottie/loader.json")}
                autoPlay={true}
                loop={true}
                speed={1.8}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '120%',
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        zIndex: 1000000,
        backgroundColor: "rgba(255,255,255,0.79)"
    },

    loader: {
        width: 150,
        height: 150
    }
})

export default Loader
