import {
  getStorageItem
} from './StorageActions.js';

export async function clockInRequest(image) {
  let token = '';

  token = await getStorageItem("jwt").then((token) => {
    return token;
  })


  return fetch('https://fdfb5d54.ngrok.io/api/time-clock/clock-in', {
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