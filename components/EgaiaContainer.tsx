import React, {ReactElement} from "react";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import {
    Dimensions,
    Keyboard,
    Platform,
    StatusBar,
    StyleProp,
    StyleSheet,
    TouchableWithoutFeedback, View,
    ViewStyle
} from "react-native";

interface EgaiaContainerProps {
    children: ReactElement | ReactElement[],
    backgroundColor?: string
}

const EgaiaContainer = ({children, backgroundColor}: EgaiaContainerProps) => {

    const styles = StyleSheet.create({
        container: {
            backgroundColor: backgroundColor ?? '#ffffff',
            height: '100%'
        },
        safeContainer: {
            height: '100%',
            paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
        }
    });

    return (
        <View style={styles.container}>
            <SafeAreaProvider>
                <SafeAreaView style={styles.safeContainer}>
                    {children}
                </SafeAreaView>
            </SafeAreaProvider>
        </View>
    );
}

export default EgaiaContainer
