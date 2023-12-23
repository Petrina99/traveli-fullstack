import express from 'express'
import { toggleLike } from '../controllers'

export const likeRouter = express.Router()

likeRouter.route('/:id/:userid').post(toggleLike)
