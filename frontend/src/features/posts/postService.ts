import axios from 'axios'

const API_URL = 'http://localhost:8000/api/posts/'

const getPosts = async () => {
    
    const response = await axios.get(API_URL)

    return response.data
}

const postService = {
    getPosts
}

export default postService