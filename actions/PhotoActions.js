import {
  getStorageItem
} from './StorageActions.js';
import Constants from 'expo-constants';

const apiUrl = Constants.manifest.extra.apiUrl;

export async function statusRequest(loginCode, company) {
  let token = '';

  token = await getStorageItem("jwt").then((token) => {
    return token;
  })


  return fetch(`${apiUrl}/api/time-clock/status`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ loginCode, company })
  });
}