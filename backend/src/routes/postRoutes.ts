import express from 'express'
import { 
    getPosts, 
    getPost,
    getUserPosts,
    createPost,
    deletePost,
    likePost,
    dislikePost
} from '../controllers'

export const postRouter = express.Router()

postRouter.route('/').get(getPosts)
postRouter.route('/:id').get(getPost)
postRouter.route('/userpost/:id').get(getUserPosts)

postRouter.route('/').post(createPost)

postRouter.route('/:id').delete(deletePost)

postRouter.route('/like/:id').put(likePost)
postRouter.route('/dislike/:id').put(dislikePost)
