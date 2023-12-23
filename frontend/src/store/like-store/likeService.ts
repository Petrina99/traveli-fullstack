import axios from 'axios'

const API_URL = 'http://localhost:8000/api/likes/'

const toggleLike = async (userid: number, id: number) => {

    const response = await axios.post(API_URL + id + '/' + userid)

    return response.data
}

const likeService = {
    toggleLike
}

export default likeService