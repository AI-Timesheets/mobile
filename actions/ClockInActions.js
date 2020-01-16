export function clockInRequest
(image) {
  console.log(image);
  try {
    return fetch('https://f9bcf1fb.ngrok.io/api/time-clock/clock-in', {method: 'POST', data: {}})
      .then(response => response.text())
      .then(responseJson => {
        return responseJson;
      });
  } catch (error) {
    console.error(error);
  }
}