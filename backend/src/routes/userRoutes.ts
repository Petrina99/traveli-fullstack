import express from 'express'
import { 
    createUser, 
    getAllUsers, 
    getUser, 
    loginUser
} from '../controllers'

export const userRouter = express.Router()

userRouter.route('/:id').get(getUser)
userRouter.route('/').get(getAllUsers)

userRouter.route('/register').post(createUser)
userRouter.route('/login').post(loginUser)