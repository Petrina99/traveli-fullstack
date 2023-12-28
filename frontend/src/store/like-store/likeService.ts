import axios from 'axios'

const API_URL = 'http://localhost:8000/api/likes/'

const toggleLike = async (userid: number, id: number) => {

    const response = await axios.post(API_URL + id + '/' + userid)

    return response.data
}

const getLikes = async (id:number) => {
    const response = await axios.get(API_URL + id)

    return response.data
}

const getAllLikes = async () => {
    const response = await axios.get(API_URL)

    return response.data
}

const likeService = {
    toggleLike,
    getLikes,
    getAllLikes
}

export default likeService