class Logic {
  constructor(api_key) {
    this.#apiKey = api_key;
  }

  getData = async () => {
    try {
      // call api
      const data = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${
          this.#apiKey
        }`
      );
      // get json object of city
      const cityData = await data.json();
    } catch (err) {}
  };
}
