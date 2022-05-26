//export const endpointUrl = 'http://egaia-manager.test/api'
import Toast from "react-native-root-toast";

export const endpointUrl = 'https://manager.egaia.fr/api'

export const displaySnackBarErrors = (data: any) => {
    if(data.message) {
        Toast.show(data.message, {
            duration: Toast.durations.SHORT,
            shadow: false,
            containerStyle: {width: '100%', height: 60, borderRadius: 0, flex: 1, justifyContent: "center", alignItems: "center"},
            opacity: 1
        })
    } else {
        let message = ''
        for (const key in data) {
            message += key + ': '
            for (const childKey in data[key]) {
                message += data[key][childKey]
            }
        }

        Toast.show(message, {
            duration: Toast.durations.SHORT,
            shadow: false,
            containerStyle: {width: '100%', height: 60, borderRadius: 0, flex: 1, justifyContent: "center", alignItems: "center"},
            opacity: 1
        })
    }
}
