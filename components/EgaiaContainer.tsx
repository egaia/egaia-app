import React, {ReactElement, useContext} from "react";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import {
    ActivityIndicator,
    Dimensions,
    Keyboard,
    Platform,
    StatusBar,
    StyleProp,
    StyleSheet,
    TouchableWithoutFeedback, View,
    ViewStyle
} from "react-native";
import {LoaderContext} from "../contexts/loader";
import {LoaderContextType} from "../services/types";

interface EgaiaContainerProps {
    children: ReactElement | ReactElement[],
    backgroundColor?: string
}

const EgaiaContainer = ({children, backgroundColor}: EgaiaContainerProps) => {

    const { loading } = useContext<LoaderContextType>(LoaderContext)

    const styles = StyleSheet.create({
        container: {
            backgroundColor: backgroundColor ?? '#ffffff',
            height: '100%'
        },
        safeContainer: {
            height: '100%',
            paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
        },
        loading: {
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            zIndex: 1000,
            height: '120%',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: "rgba(177,209,130,0.6)"
        }
    });

    return (
        <View style={styles.container}>
            <SafeAreaProvider>
                <SafeAreaView style={styles.safeContainer}>
                    {loading ? <View style={styles.loading}><ActivityIndicator /></View> : null}
                    {children}
                </SafeAreaView>
            </SafeAreaProvider>
        </View>
    );
}

export default EgaiaContainer
