import { getStorageItem } from './StorageActions.js';

export async function getCompany() {
  let token = '';

  token = await getStorageItem("jwt").then((token) => {
      return token;
  })

  return fetch('https://6c77a110.ngrok.io/api/mobile-auth/self', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`
    },
  });
}