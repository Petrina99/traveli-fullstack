import express from 'express'
import { 
    createUser, 
    deleteUser, 
    getAllUsers, 
    getUser, 
    loginUser,
    addUserImage
} from '../controllers'

import { upload } from '../server'

export const userRouter = express.Router()

userRouter.route('/:id').get(getUser)
userRouter.route('/').get(getAllUsers)

userRouter.route('/register').post(createUser)
userRouter.route('/login').post(loginUser)

userRouter.route('/delete/:id').delete(deleteUser)

userRouter.route('/:id').patch(upload.single('image'), addUserImage)