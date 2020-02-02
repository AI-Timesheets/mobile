import {
  getStorageItem
} from './StorageActions.js';
import Constants from 'expo-constants';

const apiUrl = Constants.manifest.extra.apiUrl;

export async function clockInRequest(image) {
  let token = '';

  token = await getStorageItem("jwt").then((token) => {
    return token;
  })


  return fetch(`${apiUrl}/api/time-clock/clock-in`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        photos: [
          image.base64
        ]
      })
    });
}

export async function recognizeRequest(image) {
  let token = '';

  token = await getStorageItem("jwt").then((token) => {
    return token;
  })


  return fetch(`${apiUrl}/api/time-clock/recognize`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        photos: [
          image.base64
        ]
      })
    });
}

export async function clockOutRequest(image) {
  let token = '';

  token = await getStorageItem("jwt").then((token) => {
    return token;
  })


  return fetch(`${apiUrl}/api/time-clock/clock-out`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        photos: [
          image.base64
        ]
      })
    });
}