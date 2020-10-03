import React, { useState } from 'react';
import Axios from 'axios'
import './App.css';

function App() {

  const [city, setCity] = useState("")
  const [weatherData, setWeatherData] = useState({
    description: "",
    temp: "",
    country: "",
    speed: "",
    name: "",
  })

  function handleChange(e) {
    setCity(e.target.value)
  }

  const [dataLoaded, setLoaded] = useState(false)


  const searchWeather = () => {
    Axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_ID}`)
      .then((response) => {
        console.log(response.data)
        setWeatherData(
          {
            description: response.data.weather[0].description,
            temp: response.data.main.temp,
            country: response.data.sys.country,
            name: response.data.name,
            main: response.data.wind.speed,
          })
      })
      .catch(error => {
        console.log(error.response)
      });
    setLoaded(true)
  }

  const keypress = (event) => {
    if (event.keyCode === 13) {
      searchWeather()
    }
  }

  return (
    <div className="App">
      <h1>Current Weather App</h1>
      <div className="input">
        <h4>Search for the weather in your city</h4>

        <input type="text" onKeyDown={(event) => keypress(event)} onChange={handleChange} placeholder="Enter City Name" />
        <button type="submit" onClick={searchWeather}>Search</button>
      </div>
      {dataLoaded && (

        <div className="displayData">
          <div className="desc">{weatherData.description}</div>
          <div className="desc">{weatherData.temp}°c</div>
          <div className="desc">{weatherData.speed}</div>
          <div className="desc">
            {weatherData.country}-{weatherData.name}
          </div>
        </div>
      )
      }
    </div >
  );
}

export default App;
