import React, {ReactElement} from "react";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import {
    Keyboard,
    Platform,
    StatusBar,
    StyleSheet,
    TouchableWithoutFeedback, View,
} from "react-native";

interface EgaiaContainerProps {
    children: ReactElement | ReactElement[],
    backgroundColor?: string,
    doublePaddingTop?: boolean
}

const EgaiaContainer = ({children, backgroundColor, doublePaddingTop}: EgaiaContainerProps) => {

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: backgroundColor ?? '#ffffff',
            height: '100%'
        },
        safeContainer: {
            flex: 1,
            height: '100%',
            paddingTop: Platform.OS === 'android' ? doublePaddingTop ? StatusBar.currentHeight!*2 : StatusBar.currentHeight : 0
        }
    });

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <SafeAreaProvider>
                    <SafeAreaView style={styles.safeContainer}>
                        {children}
                    </SafeAreaView>
                </SafeAreaProvider>
            </TouchableWithoutFeedback>
        </View>
    );
}

export default EgaiaContainer
