// eslint-disable-next-line max-classes-per-file
import { API_KEY } from './config.js';
// import DisplayUI from './display.js';
// import Logic from './logic.js';

const tempEl = document.querySelector('.temperature');

class Logic {
  #apiKey;

  #weatherData = {
    feelsLike: undefined,
    humidity: undefined,
    pressure: undefined,
    temp: undefined,
    tempMax: undefined,
    tempMin: undefined,
  };

  celsius = false;

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
      const { feels_like, humidity, pressure, temp, temp_max, temp_min } =
        cityData.main;

      this.#weatherData.feelsLike = feels_like;
      this.#weatherData.humidity = humidity;
      this.#weatherData.pressure = pressure;
      this.#weatherData.temp = temp;
      this.#weatherData.tempMax = temp_max;
      this.#weatherData.tempMin = temp_min;

      // eslint-disable-next-line no-use-before-define
      display.updateInfo(city, this.#weatherData);
    } catch (err) {
      console.log(err);
    }
  };

  toggleFormat() {
    if (!this.celsius) return;

    // eslint-disable-next-line no-restricted-syntax
    for (const property in this.#weatherData) {
      if (property !== 'humidity' && property !== 'pressure') {
        this.#weatherData[property] = Math.round(
          ((this.#weatherData[property] - 32) * 5) / 9
        );
      }
    }
  }

  toggleCelsius() {
    return this.celsius === false
      ? (this.celsius = true)
      : (this.celsius = false);
  }
  logData() {
    console.log(this.#weatherData);
  }
}

class DisplayUI {
  updateInfo(city, dataObj) {
    const { feelsLike, humidity, pressure, temp, tempMax, tempMin } = dataObj;
    const tempEl = document.querySelector('.temp-number');
    const locationEl = document.querySelector('.location');

    // First Word in city to upper case
    const upperCity = city.charAt(0).toUpperCase() + city.slice(1);

    tempEl.textContent = Math.round(temp);
    locationEl.textContent = upperCity;
    this.changeFormat();
    logic.toggleFormat();
    logic.logData();
  }

  changeFormat() {
    const tempEl = document.querySelector('.temp-number');
    tempEl.textContent = Math.round(((+tempEl.textContent - 32) * 5) / 9);

    console.log(tempEl.textContent);
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

tempEl.addEventListener('click', (e) => {});

function init() {
  // logic.getData('new york');
  logic.getData('austin');
}

init();
