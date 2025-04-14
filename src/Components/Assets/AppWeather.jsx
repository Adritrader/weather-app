import React from 'react'
import './AppWeather.css'
import search_icon from './images/search.png'
import sunny_icon from './images/sunny.png'
import cloudy_icon from './images/cloudy.png'
import humidity_icon from './images/humidity.png'
import rain_icon from './images/rain.png'
import snow_icon from './images/snow.png'
import sunnycloudy_icon from './images/sunnycloudy.png'
import wind_icon from './images/wind.png'
import { FaWind } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";



export const AppWeather = () => {
  return (
    <div className='weather'>
      <div className='search-bar'>
        <input type='text' placeholder='Buscar' />
          <img src={search_icon} alt='' />    
      </div> 
      <img src={sunny_icon} alt='' className='weather-icon' />
      <p className='temperature'>16º</p>
      <p className='location'>Londres</p> 
      <div className='weather-data'>
        <div className='col'>
          <WiHumidity className='icon'/>
            <p>91%</p>
            <span>Humedad</span>
        </div>

          <div className='col'>
            <FaWind className='icon' />
              <p>3.6kmh</p>
              <span>Vel. viento</span>
            
          </div>
      </div>
      
      
    </div>
  )
}
