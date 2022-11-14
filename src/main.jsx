import React from 'react';
import './main.css';
import axios from 'axios'
import { useState } from 'react';
import Clouds from './assets/clouds.jpg'
import Rain from './assets/rain.jpg'
import sunny from './assets/sunny.jpg'
import Clear from './assets/Clear.jpg'
import Drizzle from './assets/Drizzle.jpg'
import { useEffect } from 'react';

const Main = () => {
    const [data, setData] = useState(null)
    const [place, setPlace] = useState("")
    const [image, setImage] = useState('')
    const [error, setError] = useState(false)
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=17662203aa98996cd24df831e74c5e9e&units=metric&lang=sp`

    const searchFunction = () => {
        axios.get(URL)
        .then(function (response) {
            setData(response.data)
            
            setError(false)
        })
        .catch(function () {
             setError(true)
        })
    }

    const sunsetFunction = () => {
        let unix = data.sys.sunset
        let date = new Date(unix * 1000)
        let hours = date.getHours()
        let minutes = date.getMinutes()
        let time = hours + ":" + minutes
        return time
    }

    const speedMultiplier = (dataReceived) => {
        let mtsSpeed = dataReceived
        let kmhSpeed = mtsSpeed * 3.6
        return kmhSpeed.toFixed()
    }

    useEffect(()=>{
        if (data) {
            switch (data.weather[0].main) {
                case "Rain":
                    setImage(Rain)
                    break;
                case "Clouds":
                    setImage(Clouds)
                    break;
                case "Clear":
                    setImage(Clear)
                    break;
                case "Drizzle":
                    setImage(Drizzle)
                    break;
                default: 
                    break;
            }
        }
    }, [data])
    
    return(
        <div>
        <div className='container'>
            <div className='container-card'>
                <div className='searchbar'>
                    <input 
                    type="text" 
                    placeholder='Location'
                    name="searchbar"
                    value={place}
                    onChange={event => setPlace(event.target.value)}
                    />
                    <button onClick={() => searchFunction()} >Search</button>
                </div>
                {error ? <p id='error'>Intenta con otro nombre</p> : null}
                <div className='top'>
                    {data ? <img src={image} className="background-img" /> : null}
                    {data ? <h1>{data.name}, {data.sys.country}</h1> : null}
                    {data ? <img src={"https://openweathermap.org/img/w/" + data.weather[0].icon + ".png"} alt="icon" className='icon'/> : null}
                </div>

                    <div className={data ? "container-bottom" : "visible"}>
                        
                        <div className="bottom">
                            <h2>Clima</h2>
                                <div className='bottom-weather'>
                                    {data ? <p>{data.weather[0].description.toUpperCase()}</p> : null }
                                </div>
                                
                        </div>
                        <div className="bottom">
                            <h2>Temperatura</h2>
                            {data ? <p>{Math.floor(data.main.temp)}°</p> : null }
                        </div>
                        <div className="bottom bottom-last">
                            <h2>Sensación Térmica</h2>
                            {data ? <p>{Math.floor(data.main.feels_like)}°</p> : null }
                        </div>
                    </div>
                    <div className={data ? "container-bottom-2" : "visible"}>
                        <div className="bottom last">
                            <h2>Humedad</h2>
                                <div className='bottom-weather'>
                                    {data ? <p>{data.main.humidity}%</p> : null }
                                    {data ? <img src={"https://openweathermap.org/img/w/" + data.weather[0].icon + ".png"} className='icon-bottom'/> : null}
                                </div>
                        </div>
                        <div className="bottom last">
                            <h2>Atardecer</h2>
                            {data ?  <p>{sunsetFunction()}</p> : null }
                        </div>
                        <div className="bottom last bottom-last" >
                            <h2>Viento</h2>
                            {data ? <p>{speedMultiplier(data.wind.speed)} km/h</p> : null }
                        </div>
                    </div>
            </div>
        </div>
        </div>
    )
}

export default Main;