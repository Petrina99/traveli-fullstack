import express from 'express'

import { 
    getCurrentWeather
} from '../controllers'

export const weatherRouter = express.Router()

weatherRouter.route('/:location').get(getCurrentWeather)