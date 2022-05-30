import {Modal, StyleSheet, Text, TouchableOpacity, View, Image} from "react-native";
import {Colors} from "../services/constants";
import {Promotion} from "../models/Promotion";

interface PlaceModalProps {
    promotion: Promotion,
    visible: boolean,
    onClose: () => void,
    onPressYes: () => void
}

const PlaceModal = ({promotion, visible, onClose, onPressYes}: PlaceModalProps) => {
    return (
        <Modal animationType="fade" visible={visible} transparent={true}>
            <View style={styles.modalContainer}>
                <View style={styles.globalContainer}>
                    <TouchableOpacity style={styles.close} onPress={onClose}>
                        <Image style={styles.icon} source={require("../assets/icons/cross.png")}/>
                    </TouchableOpacity>
                    <View style={styles.bodyContainer}>
                        <Text>Voulez-vous profitez de cette offre ?</Text>
                        <Text>{promotion.partner?.name} : {promotion.label}</Text>
                        <Text>Vous utiliserez {promotion.cost} de vos gaïas</Text>
                        <TouchableOpacity onPress={onClose}>
                            <Text style={styles.btn}>Annuler</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onPressYes}>
                            <Text style={styles.btn}>Utiliser l'offre</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },

    globalContainer: {
        backgroundColor: Colors.background,
        width: '90%',
        height: '30%',
        borderRadius: 15
    },

    close: {
        height: '10%',
        justifyContent: "center",
        alignItems: "flex-end",
        width: '100%',
        paddingRight: 25,
        paddingTop: 25
    },

    bodyContainer: {
        height: '80%',
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },

    icon: {
        width: 20,
        height: 20,
        tintColor: Colors.white
    },

    btn: {
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginTop: 5,
        fontWeight: "500"
    },
})

export default PlaceModal
