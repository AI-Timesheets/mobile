import { AsyncStorage } from "react-native";

export async function getStorageItem(item) {
  return await AsyncStorage.getItem(item);
}

export function setStorageItem(key, value) {
  return AsyncStorage.setItem(key, value);
}