import React, {ReactElement} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {Dimensions, Keyboard, StyleProp, StyleSheet, TouchableWithoutFeedback, ViewStyle} from "react-native";

interface EgaiaContainerProps {
    children: ReactElement|ReactElement[],
    withAppBar?: boolean,
    withBottomBar?: boolean,
    style?: StyleProp<ViewStyle>
}

const EgaiaContainer = ({children, style, withAppBar, withBottomBar}: EgaiaContainerProps) =>  {
    let windowHeight = Dimensions.get("window").height

    if(withAppBar) {
        windowHeight -= 90;
    }

    if(withBottomBar) {
        windowHeight -= 90;
    }

    const styles = StyleSheet.create({
        container: {
            height: windowHeight,
            marginTop: withAppBar ? 90 : 0,
        }
    });

    return (
        <SafeAreaView style={[styles.container, style]}>
            {children}
        </SafeAreaView>
    );
}


export default EgaiaContainer
