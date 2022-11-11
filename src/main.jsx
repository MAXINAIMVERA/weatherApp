import React from 'react';
import './main.css';
import axios from 'axios'
import { useState } from 'react';
import Clouds from './assets/clouds.jpg'
import Rain from './assets/rain.jpg'
import sunny from './assets/sunny.jpg'

const Main = () => {
    const [data, setData] = useState(null)
    const [place, setPlace] = useState("")
    const [image, setImage] = useState(Clouds)
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=17662203aa98996cd24df831e74c5e9e&units=metric`

    const searchFunction = () => {
        axios.get(URL)
        .then(function (response) {
            setData(response.data)
            console.log(response.data)
        })
        .catch(function (error) {
             console.log(error);
        })
        setImageFunction(data)
    }

    const setImageFunction = (data) => {
            console.log(data.weather[0].main)
            setImage(data.weather[0].main) 
    }
    
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
                <div className='top'>
                    {}
                    <img src={image} alt="" />
                    {data ? <h1>{data.name}</h1> : null}
                </div>
                <div className='container-bottom'>
                    <div className="bottom">
                        <h2>Weather</h2>
                        {data ? <p>{data.weather[0].main}</p> : null }
                    </div>
                    <div className="bottom">
                        <h2>Temperature</h2>
                        {data ? <p>{Math.floor(data.main.temp)}°</p> : null }
                    </div>
                    <div className="bottom" id='bottom-last'>
                        <h2>Sensation</h2>
                        {data ? <p>{Math.floor(data.main.feels_like)}°</p> : null }
                    </div>
                    
                </div>
            </div>
        </div>
        </div>
    )
}

export default Main;