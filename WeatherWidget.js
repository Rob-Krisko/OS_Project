import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import styles from './WeatherWidget.module.css';

const API_KEY = 'db65b051b1ce560a620362330f5e0542';

function WeatherWidget(props) {
    const [weather, setWeather] = useState(null);
    const [city, setCity] = useState('Atlanta');  // Atlanta is the default city

    const fetchWeather = useCallback(() => {
        axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
            .then((response) => {
                const weatherData = {
                    temperature: response.data.main.temp,
                    description: response.data.weather[0].description,
                    icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
                };
                setWeather(weatherData);
            })
            .catch((error) => console.error(`Error: ${error}`));
    }, [city]);

    useEffect(() => {
        fetchWeather();
    }, [fetchWeather]);

    function handleInputChange(e) {
        setCity(e.target.value);
    }

    function handleInputSubmit(e) {
        e.preventDefault();
        fetchWeather();
    }

    if (!weather) return null;

    return (
        <div className={`${styles.weatherWidget} ${props.className}`}>
            <form onSubmit={handleInputSubmit}>
                <input type='text' value={city} onChange={handleInputChange} placeholder='Enter city' />
                <button type='submit'>Update</button>
            </form>
            <img src={weather.icon} alt={weather.description} />
            <p>{weather.temperature}°C</p>
            <p>{weather.description}</p>
        </div>
    );
}

export default WeatherWidget;
