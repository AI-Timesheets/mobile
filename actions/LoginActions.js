export function login(code) {
  return fetch('https://6c77a110.ngrok.io/api/mobile-auth/login', {
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