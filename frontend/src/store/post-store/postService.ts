import { PostModel } from '@/models'
import axios from 'axios'

const API_URL = 'http://localhost:8000/api/posts/'

const getPosts = async () => {
    
    const response = await axios.get(API_URL)

    return response.data
}

const getUserPosts = async (id: number) => {
    const response = await axios.get(API_URL + 'userpost/' + id) 

    return response.data
}

const getOnePost = async (id: number) => {
    const response = await axios.get(API_URL + id)

    return response.data
}

const createPost = async (postData: PostModel) => {
    const response = await axios.post(API_URL, postData)

    return response.data
}

const deletePost = async (id: number) => {
    const response = await axios.delete(API_URL + id)

    return response.data
}

interface EditPostModel {
    title: string;
    location: string;
    content: string;
}
const editPost = async (id: number, postData: EditPostModel) => {
    const response = await axios.patch(API_URL + 'edit/' + id, postData)

    return response.data
}

const postService = {
    getPosts,
    getUserPosts,
    createPost,
    deletePost,
    getOnePost,
    editPost
}

export default postService