import { getStorageItem } from './StorageActions.js';
import Constants from 'expo-constants';

const apiUrl = Constants.manifest.extra.apiUrl;

export async function getCompany() {
  let token = '';

  token = await getStorageItem("jwt").then((token) => {
      return token;
  })

  return fetch(`${apiUrl}/api/mobile-auth/self`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`
    },
  });
}