import express from 'express'
import { createComment, deleteComment, getComments, getUserComments } from '../controllers'

export const commentRouter = express.Router()

commentRouter.route('/:id').get(getComments)
commentRouter.route('/usercount/:id').get(getUserComments)

commentRouter.route('/:id/:userid').post(createComment)

commentRouter.route('/:id').delete(deleteComment)