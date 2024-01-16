import axios from 'axios'

import { useState, useEffect } from 'react'

import { ForecastCard } from '.'

interface propTypes {
    location: string | undefined
}

import style from '../styles/weatherCard.module.css'

export const WeatherCard: React.FC<propTypes> = (props) => {

    const { location } = props

    const [weatherInfo, setWeatherInfo] = useState<any>()
    const [locationInfo, setLocationInfo] = useState<any>()
    const [futureForecast, setFutureForecast] = useState<any>()

    useEffect(() => {
        const fetchWeather = async () => {
            const response = await axios.get('http://localhost:8000/api/weather/' + location)
            
            /*for (let i = 0; i < 7; i++) {
                console.log(response.data.forecast.forecast.forecastday[i].day)
            }*/


            console.log(response.data.current)
            console.log(response.data.forecast)
            console.log(response.data.forecast.forecast)
            setWeatherInfo(response.data.current.current)
            setLocationInfo(response.data.current.location)

            const future = response.data.forecast.forecast.forecastday.slice(1)
            console.log(future)
            setFutureForecast(future)
        }

        fetchWeather()
    }, [])

    return (
        <div className={style.weatherInfo}>
            <p className={style.infoHeading}>Weather forecast for {location}</p>
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
            {futureForecast ? (
                <div className={style.futureForecast}>
                    <p className={style.futureHeading}>Next 7 days</p>
                    <div className={style.forecastContainer}>
                        {futureForecast.map((item:any) => (
                            <ForecastCard day={item} key={item.date} />
                        ))}
                    </div>
                </div>
            ) : (
                <p>Loading ...</p>
            )}
        </div>
    )
}