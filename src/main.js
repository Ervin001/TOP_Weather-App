import { API_KEY } from './config.js';

const callApi = async function (city) {
  try {
    const data = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
    );
    const cityData = await data.json();
    return cityData.coord;
  } catch (err) {
    console.log(err);
  }
};

const secondApiCall = async function (cordinates, cityName) {
  try {
    const [lat, lon] = cordinates;
    const data = await fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );

    console.log(data);
  } catch (err) {
    console.log(err);
  }
};
