import Constants from 'expo-constants';

const apiUrl = Constants.manifest.extra.apiUrl;

export function login(code) {
  return fetch(`${apiUrl}/api/mobile-auth/login`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      companyCode: code
    })
  });
}