export function login(code) {
  return fetch('https://cc4fbe1c.ngrok.io/api/mobile-auth/login', {
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