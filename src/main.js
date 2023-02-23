import { API_KEY } from './config.js';
import DisplayUI from './display.js';
import Logic from './logic.js';

const logic = new Logic();
const display = new DisplayUI();

const searchField = document.querySelector('.search');

const callApi = async function (city) {
  try {
    const data = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${API_KEY}`
    );
    const cityData = await data.json();
    console.log(cityData);
    return cityData.coord;
  } catch (err) {
    console.log(err);
  }
};

searchField.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    callApi(searchField.value);
  }
});

// create weather func

// toggleDeg

function init() {
  callApi('Dallas');
}

init();
