import { CommentModel } from "@/models";

import axios from 'axios'

const API_URL = 'http://localhost:8000/api/comments/'

const createComment = async (commentData: CommentModel) => {

    const { id, userid, text } = commentData
    const response = await axios.post(API_URL + id + '/' + userid, {text})

    return response.data
}

const getAllComments = async (id: number) => {
    const response = await axios.get(API_URL + id)

    return response.data
}

const commentService = {
    createComment,
    getAllComments
}

export default commentService