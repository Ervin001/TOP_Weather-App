import { API_KEY } from './config.js';

const searchField = document.querySelector('.search');

const callApi = async function (city) {
  try {
    const data = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
    );
    const cityData = await data.json();
    console.log(cityData);
    return cityData.coord;
  } catch (err) {
    console.log(err);
  }
};

searchField.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    callApi(searchField.value);
  }
});

function init() {
  callApi('Dallas');
}

init();
