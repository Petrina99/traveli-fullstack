import express from 'express'
import { createComment, deleteComment, getComments } from '../controllers'

export const commentRouter = express.Router()

commentRouter.route('/:id').get(getComments)

commentRouter.route('/:id/:userid').post(createComment)

commentRouter.route('/:id').delete(deleteComment)