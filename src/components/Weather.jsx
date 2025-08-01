import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import searchicon from '../assets/search-Icon.svg'
import main from '../assets/main.svg'
import cloud from '../assets/cloud.svg'
import clear from '../assets/clear.svg'
import cloudrain from '../assets/cloudy and rainny.svg'
import heavy from '../assets/heavyRain.svg'
import nightclear from '../assets/nightclear.svg'
import nightcloud from '../assets/nightcloud.svg'
import nightrain from '../assets/nightrain.svg'
import rain from '../assets/rain.svg'
import sunny from '../assets/sunny.svg'
import thunder from '../assets/thunder.svg'
import humidity from '../assets/humidity.svg'
import wind from '../assets/windspeed.svg'
import snow from '../assets/snow.svg'
import mist from '../assets/mist.svg'

const Weather = () => {

  const inpRef = useRef()
  const [weatherInfo, setWeatherInfo] = useState(false);
  const icons = {
    "01d": clear,
    "02d": sunny,
    "03d": cloud,
    "04d": cloud,
    "09d": rain,
    "10d": thunder,
    "11d": heavy,
    "13d": snow,
    "01n": nightclear,
    "02n": nightcloud,
    "03n": nightcloud,
    "04n": nightcloud,
    "09n": nightrain,
    "10n": thunder,
    "11n": nightrain,
    "13n": snow,
    "50d": mist,
    "50n": mist
  }

  const search = async (city) => {

    if(city === ""){
      alert("Enter City Name");
      return;
    }

    try {
      const url = (`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_API_KEY}`);

    const response = await fetch(url); 
    const data = await response.json();
    if(!response.ok){
      alert("City not found");
      return;
    }
    console.log(data);
    const icon = icons[data.weather[0].icon] || main;
    setWeatherInfo({
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      temprature: Math.floor(data.main.temp),
      feel: Math.floor(data.main.feels_like),
      location: data.name,
      icon: icon
    })

    } catch (error) {
      setWeatherInfo(false);
      console.error("Error in data Fetching");
    }
  }

  useEffect(()=>{
    search("Lahore");
  }, [])
  return (
    <div className='main'>
      <div className="heading">
        <h3>Forcastly</h3>
      </div>
      <div className="search disp">
        <div className="inp">
          <input ref={inpRef} type="text" />
        </div>
        <div className="searchicon disp">
          <img src={searchicon} onClick={() => search(inpRef.current.value)}/>
        </div>
      </div>
      <div className="center disp">
        <div className="city">
          <p className="loc">{weatherInfo.location}</p>
        </div>
        <div className="image">
          <img src={weatherInfo.icon} />
        </div>
        <div className="temp disp">
          <p>Cloudy and Rainny</p>
          {weatherInfo.temprature} °C
        </div>
        <div className="quality disp">
          <p>Temperature Feels Like</p>
          <p>{weatherInfo.feel} °C</p>
        </div>

      </div>
      <div className="end">
        <div className="left">
          <img src={humidity} />
          <p>{weatherInfo.humidity}%</p>
          <p>humidity</p>
        </div>
        <div className="right">
          <img src={wind} />
          <p>{weatherInfo.windSpeed}km/h</p>
          <p>Winds</p>
        </div>
      </div>
    </div>
  )
}
export default Weather;
