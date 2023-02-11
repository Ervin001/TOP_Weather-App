import apiKey from './apiCall.js';

const callApi = async function (city) {
  try {
    const data = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    );
    const cityData = await data.json();
    console.log(cityData);
  } catch (err) {
    console.log(err);
  }
};

callApi('Dallas');
