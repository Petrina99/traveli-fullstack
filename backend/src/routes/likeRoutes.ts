import express from 'express'
import { toggleLike, getLikes, getAllLikes } from '../controllers'

export const likeRouter = express.Router()

likeRouter.route('/:id/:userid').post(toggleLike)

likeRouter.route('/:id').get(getLikes)
likeRouter.route('/').get(getAllLikes)
