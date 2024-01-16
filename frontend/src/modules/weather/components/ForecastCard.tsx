import { useEffect, useState } from "react";

const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

interface propTypes {
    day: any
}

import style from '../styles/weatherCard.module.css'
import drop from '@/assets/raindrop-drop-svgrepo-com.svg'
import snowflake from '@/assets/snowflake-svgrepo-com.svg'

export const ForecastCard: React.FC<propTypes> = (props) => {

    const { day } = props

    const [dayOfWeek, setDayOfWeek] = useState<string>()

    useEffect(() => {
        const findDay = () => {
            let date = new Date(day.date)
            setDayOfWeek(days[date.getDay()])
        }

        console.log(day)
        findDay()
    }, [])

    return ( 
        <div className={style.forecastItem}>
            {dayOfWeek ? (
                <div className={style.forecastCard}>
                    <p>{dayOfWeek}</p>
                    <img src={day.day.condition.icon} alt={day.day.condition.text} />
                    <p>{Math.round(day.day.maxtemp_c)}&deg; {Math.round(day.day.mintemp_c)}&deg;</p>
                    <p><img src={drop} alt="drop of rain" width={12}/> {day.day.daily_chance_of_rain}%</p>
                    <p><img src={snowflake} alt="snowflake" width={12}/> {day.day.daily_chance_of_snow}%</p>
                </div>
            ) : (
                <p>Loading</p>
            )}
        </div>
    )
}