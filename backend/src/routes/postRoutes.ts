import express from 'express'
import { 
    getPosts, 
    getPost,
    getUserPosts,
    createPost,
    deletePost,
    editPost
} from '../controllers'

export const postRouter = express.Router()

postRouter.route('/').get(getPosts)
postRouter.route('/:id').get(getPost)
postRouter.route('/userpost/:id').get(getUserPosts)

postRouter.route('/').post(createPost)

postRouter.route('/edit/:id').patch(editPost)

postRouter.route('/:id').delete(deletePost)
