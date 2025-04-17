import React, { useEffect, useRef, useState } from 'react'
import './AppWeather.css'
import search_icon from './images/search.png'
import sunny_icon from './images/sunny.png'
import cloudy_icon from './images/cloudy.png'
import rain_icon from './images/rain.png'
import snow_icon from './images/snow.png'
import sunnycloudy_icon from './images/sunnycloudy.png'
import { FaWind } from "react-icons/fa"
import { WiHumidity } from "react-icons/wi"

export const AppWeather = () => {
  const inputRef = useRef()
  const [weatherData, setWeatherData] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const allIcons = {
    "01d" : sunny_icon,
    "01n" : sunny_icon,
    "02d" : cloudy_icon,
    "02n" : cloudy_icon,
    "03d" : sunnycloudy_icon,
    "03n" : sunnycloudy_icon,
    "09d" : rain_icon,
    "09n" : rain_icon,
    "10d" : rain_icon,
    "10n" : rain_icon,
    "13d" : snow_icon,
    "13n" : snow_icon
  }

  const search = async (city) => {
    if(city === "") {
      setError("Please enter a city name");
      return;
    }

    try {
      setError(null);
      setIsLoading(true);
      const API_KEY = process.env.REACT_APP_API_KEY;
      if (!API_KEY) throw new Error('API key not configured');
      
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(response.status === 404 ? 'City not found' : 'Failed to fetch weather data');
      }
      const data = await response.json();

      const icon = allIcons[data.weather[0].icon] || sunny_icon;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon
      })
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setError(error.message || "Failed to get weather data");
      setWeatherData(false);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    search("London");
  }, [])

  return (
    <div className='weather'>
      <div className='search-bar'>
        <input ref={inputRef} type='text' placeholder='Buscar' />
        <img src={search_icon} alt='' onClick={() => search(inputRef.current.value)}/>
        
        {isLoading && (
          <div className="loading-spinner">
            Loading...
          </div>
        )}
        
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
      </div>

      {weatherData ? <>
        <img src={weatherData.icon} alt='weather icon' className='weather-icon' />
        <p className='temperature'>{weatherData.temperature}ºC</p>
        <p className='location'>{weatherData.location}</p> 
        <div className='weather-data'>
          <div className='col'>
            <WiHumidity className='icon'/>
            <p>{weatherData.humidity}%</p>
            <span>Humedad</span>
          </div>
          <div className='col'>
            <FaWind className='icon' />
            <p>{weatherData.windSpeed} Km/h</p>
            <span>Vel. viento</span>
          </div>
        </div>
      </> : <></>} 
    </div>
  )
}
