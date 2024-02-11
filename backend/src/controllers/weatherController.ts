import { Request, Response } from 'express'

import axios from "axios"

import { weatherApiKey } from "../server"

const API_URL = "http://api.weatherapi.com/v1/"

export const getCurrentWeather = async (req: Request, res: Response) => {
    const { location } = req.params

    const responseCurrent = await axios.get(API_URL + `current.json?key=${weatherApiKey}&q=${location}&aqi=no`)

    const data = {
        current: responseCurrent.data,
    }

    res.json(data)
}