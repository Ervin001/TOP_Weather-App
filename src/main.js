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
    city: undefined,
  };

  celsius = false;

  constructor(api_key) {
    this.#apiKey = api_key;
  }

  getData = async (city) => {
    try {
      // call api
      const data = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${
          this.celsius === false ? 'imperial' : 'metric'
        }&appid=${this.#apiKey}`
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
      this.#weatherData.city = city;

      display.updateInfo(this.#weatherData);
    } catch (err) {
      console.log(err);
    }
  };

  toggleFormat() {
    // celsius to fahrenheit
    if (!this.celsius) {
      for (const property in this.#weatherData) {
        if (property !== 'humidity' && property !== 'pressure') {
          // (30°C x 1.8) + 32 = 86°F’
          this.#weatherData[property] = Math.round(
            this.#weatherData[property] * 1.8 + 32
          );
        }
      }
      display.changeFormat(this.#weatherData.temp);
    } else {
      // fahrenheit to celsius
      for (const property in this.#weatherData) {
        if (property !== 'humidity' && property !== 'pressure') {
          this.#weatherData[property] = Math.round(
            ((this.#weatherData[property] - 32) * 5) / 9
          );
        }
      }
      display.changeFormat(this.#weatherData.temp);
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
  updateInfo(dataObj) {
    const { feelsLike, humidity, pressure, temp, tempMax, tempMin, city } =
      dataObj;
    const tempEl = document.querySelector('.temp-number');
    const locationEl = document.querySelector('.location');
    // lower all text and then split the space
    const upperCity = city.toLowerCase().split(' ');

    tempEl.textContent = Math.round(temp);
    //
    locationEl.textContent = upperCity
      .map((word) => {
        return word[0].toUpperCase() + word.substring(1);
      })
      .join(' ');
    logic.logData();
  }

  changeFormat(newTemp) {
    const tempEl = document.querySelector('.temp-number');
    const degEl = document.querySelector('.deg');

    tempEl.textContent = newTemp;

    degEl.textContent === '°F'
      ? (degEl.textContent = '°C')
      : (degEl.textContent = '°F');
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

tempEl.addEventListener('click', (e) => {
  logic.toggleCelsius();
  logic.toggleFormat();
  logic.logData();
});

function init() {
  // logic.getData('new york');
  logic.getData('austin');
}

init();
