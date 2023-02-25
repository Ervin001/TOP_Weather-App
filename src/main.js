// eslint-disable-next-line max-classes-per-file
import { API_KEY } from './config.js';
// import DisplayUI from './display.js';
// import Logic from './logic.js';

class Logic {
  #apiKey;

  #tempFormat = 'fahrenheit';

  constructor(api_key) {
    this.#apiKey = api_key;
  }

  getData = async (city) => {
    try {
      // call api
      const data = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${
          this.#apiKey
        }`
      );
      // get json object of city
      const cityData = await data.json();
      // eslint-disable-next-line no-use-before-define
      display.updateInfo(city, cityData);
    } catch (err) {}
  };
}

class DisplayUI {
  updateInfo(city, data) {
    let { feels_like, humidity, pressure, temp, temp_max, temp_min } =
      data.main;

    temp = Math.round(temp);

    this.logInfo(
      feels_like,
      humidity,
      pressure,
      temp,
      temp_max,
      temp_min,
      city
    );
    const tempEl = document.querySelector('.temperature');
    const dateEl = document.querySelector('.date');
    const locationEl = document.querySelector('.location');

    // set temp
    tempEl.textContent = temp;
    // set city
    locationEl.textContent = city;
    // set date
  }

  logInfo(...data) {
    console.log(`%c ${data}`, 'color: red;');
  }
}

const logic = new Logic(API_KEY);
const display = new DisplayUI();

const searchField = document.querySelector('.search');

searchField.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    logic.getData(searchField.value);
  }
});

function init() {
  logic.getData('new york');
}

init();
