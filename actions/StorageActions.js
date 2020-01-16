import { AsyncStorage } from "react-native";

export function getStorageItem(key) {
  var item = null;

  AsyncStorage.getItem(key).then((data) => {
    // item = data
  }).catch((exception) => {
    //
  });

  return item;
}

export function setStorageItem(key, value) {
  return AsyncStorage.setItem(key, value);
}