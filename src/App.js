import React, { useState} from 'react';
import axios from 'axios';
import watercolor from './assets/watercolor.jpg';
import atmo from "./assets/atmo.gif";
import clear from "./assets/clear.gif";
import clouds from "./assets/clouds.gif";
import drizzle from "./assets/drizzle.gif";
import rain from "./assets/rain.gif";
import snow from "./assets/snow.gif";
import thunderStorm from "./assets/thunder-storm.gif";

const videos = [
  {
    name: "atmo",
    background: atmo

  },
  {
    name: "clear",
    background: clear
  },
  {
    name: "clouds",
    background: clouds
  },
  {
    name: "drizzle",
    background: drizzle
  },
  {
    name: "rain",
    background: rain
  },
  {
    name: "snow",
    background: snow
  },
  {
    name: "thunderStorm",
    background: thunderStorm
  },
]

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const [image, setImage] = useState(watercolor);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=3bd76de69aeabd953c969e9ace530f77`

  const handleBgImage = (weather) => {
    switch (weather) {
      case 'Thunderstorm':
        setImage(thunderStorm);
        break;
      case 'Drizzle':
        setImage(drizzle);
        break;
      case 'Rain':
        setImage(rain);
        break;
      case 'Snow':
        setImage(snow);
        break;
      case 'Atmosphere':
        setImage(atmo);
        break;
      case 'Clear':
        setImage(clear);
        break;
      case 'Clouds':
        setImage(clouds);
        break;
      default:
        break;
    }
  }

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
        handleBgImage(response.data.weather[0].main);
      })
      setLocation('');
    }
  }

  return (
    <div 
      className='app' 
      style={
        { backgroundImage: `url(${image})`, 
          backgroundRepeat: 'no-repeat', 
          backgroundSize: 'cover', 
          backgroundPosition: 'center', 
          backgroundBlendMode: 'multiply' 
        }
      }
    >  
      <div className="container">
        <div className="search">
          <input
            value={location}
            onChange={event => setLocation(event.target.value)}
            onKeyPress={searchLocation}
            placeholder="Enter Location"
            type='text'
          />
        </div>
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>
        {data.name !== undefined &&
          <div className="bottom">
          <div className="feels">
            {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°F</p> : null}
            <p>Feels Like</p>
          </div>
          <div className="humidity">
            {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
            <p>Humidity</p>
          </div>
          <div className="wind">
            {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} MPH</p> : null}
            <p>Wind Speed</p>
          </div>
        </div>
        }
      </div>
    </div>  
  )
}

export default App;
