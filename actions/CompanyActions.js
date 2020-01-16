import { getStorageItem } from './StorageActions.js';

export function getCompany() {
  token = getStorageItem("jwt");

  return fetch('https://cc4fbe1c.ngrok.io/api/mobile-auth/self', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`
    },
  });
}