import {Image, TouchableOpacity} from "react-native";
import React from "react";

const EgaiaHeaderBackButton = ({navigation}: any) => {
    return (
        <TouchableOpacity onPress={() => navigation.pop()}>
            <Image
                source={require('../assets/icons/angle-gauche.png')}
                resizeMode='contain'
                style={{
                    height: 20,
                    width: 20,
                    tintColor: 'green',
                }}/>
        </TouchableOpacity>
    );
}

export default EgaiaHeaderBackButton
