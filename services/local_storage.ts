import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveUserInLocalStorage = async (token: string): Promise<void> => {
    await AsyncStorage.setItem('api_token', token)
}

export const deleteUserInLocalStorage = async (): Promise<void> => {
    await AsyncStorage.removeItem('api_token')
}
