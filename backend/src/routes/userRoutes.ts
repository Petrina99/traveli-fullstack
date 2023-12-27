import express from 'express'
import { 
    createUser, 
    deleteUser, 
    getAllUsers, 
    getUser, 
    loginUser
} from '../controllers'

export const userRouter = express.Router()

userRouter.route('/:id').get(getUser)
userRouter.route('/').get(getAllUsers)

userRouter.route('/register').post(createUser)
userRouter.route('/login').post(loginUser)

userRouter.route('/delete/:id').delete(deleteUser)