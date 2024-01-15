import axios from 'axios'

import { useState, useEffect } from 'react'

interface propTypes {
    location: string | undefined
}

import style from '../styles/weatherCard.module.css'

export const WeatherCard: React.FC<propTypes> = (props) => {

    const { location } = props

    const [weatherInfo, setWeatherInfo] = useState<any>()
    const [locationInfo, setLocationInfo] = useState<any>()

    useEffect(() => {
        const fetchWeather = async () => {
            const response = await axios.get('http://localhost:8000/api/weather/' + location)
    
            console.log(response.data.current)
            console.log(response.data.forecast)
            setWeatherInfo(response.data.current.current)
            setLocationInfo(response.data.current.location)
        }

        fetchWeather()
    }, [])

    return (
        <div className={style.weatherInfo}>
            {(weatherInfo && locationInfo) ? (
                <div className={style.weatherGraphic}>
                    <div className={style.condition}>
                        <p className={style.conditionText}>{locationInfo.name}, {locationInfo.country}</p>
                        <p className={style.conditionText}>Last updated: {weatherInfo.last_updated.slice(-5)}</p>
                        <img src={weatherInfo.condition.icon} alt={weatherInfo.condition.text} />
                        <div className={style.temp}>
                            <p>{weatherInfo.temp_c} &deg;C</p>
                            <p>Feels like: {weatherInfo.feelslike_c} &deg;C</p>
                        </div>
                        <p className={style.conditionText}>{weatherInfo.condition.text}</p>
                    </div>
                </div>
            ) : (
                <p className={style.loading}>Loading ...</p>
            )}
            
        </div>
    )
}