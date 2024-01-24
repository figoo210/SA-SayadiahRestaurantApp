import * as SecureStore from 'expo-secure-store';


export const storeData = async (key, value) => {
    await SecureStore.setItemAsync(key, JSON.stringify(value));
};

export const retrieveData = async (key) => {
    return JSON.parse(await SecureStore.getItemAsync(key));
};
