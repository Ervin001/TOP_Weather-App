/* eslint-disable no-sequences */
/* eslint-disable no-unused-expressions */
export default class Logic {
  #dataObj = {
    cityName: undefined,
    feelsLike: undefined,
    humidity: undefined,
    pressure: undefined,
    temp: undefined,
    tempMax: undefined,
    tempMin: undefined,
  };

  // eslint-disable-next-line no-undef
  #format = 'fahrenheit';

  weatherData(obj) {
    const { name } = obj;
    const { feels_like, humidity, pressure, temp, temp_max, temp_min } =
      obj.main;
    console.log(
      `%c City name: ${name}, Feels like: ${feels_like}, Humidity: ${humidity}, Pressure: ${pressure}, Temp: ${temp}, Max temp: ${temp_max}, Min temp: ${temp_min}`,
      'color: #60AB9A; font-size: .75rem;'
    );
    this.setData(
      name,
      feels_like,
      humidity,
      pressure,
      temp,
      temp_max,
      temp_min
    );
  }

  setData(name, feelsLike, humidity, pressure, temp, tempMax, tempMin) {
    this.#dataObj.cityName = name;
    this.#dataObj.feelsLike = feelsLike;
    this.#dataObj.humidity = humidity;
    this.#dataObj.pressure = pressure;
    this.#dataObj.temp = temp;
    this.#dataObj.tempMax = tempMax;
    this.#dataObj.tempMin = tempMin;
  }

  logData() {
    console.log(this.#dataObj);
  }
}
