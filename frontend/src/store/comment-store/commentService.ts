import { CommentModel } from "@/models";

import axios from 'axios'

const API_URL = 'http://localhost:8000/api/comments/'

const createComment = async (commentData: CommentModel) => {

    const { id, authorId, text } = commentData
    const response = await axios.post(API_URL + id + '/' + authorId, {text})

    return response.data
}

const getAllComments = async (id: number) => {
    const response = await axios.get(API_URL + id)

    return response.data
}

const getAllUserComments = async (id: number) => {
    const response = await axios.get(API_URL + 'usercount/' + id)

    return response.data
}

const deleteComment = async (id: number) => {
    const response = await axios.delete(API_URL + id) 

    return response.data
}

const commentService = {
    createComment,
    getAllComments,
    deleteComment,
    getAllUserComments
}

export default commentService