import { LikeModel } from "@/models";
import likeService from "@/store/like-store/likeService";

import { useState } from 'react'

export const useLike = () => {

    const [like, setLike] = useState()
    const [likes, setLikes] = useState([])
    const [isLiked, setIsLiked] = useState(false)

    const getLikes = async (id: number) => {
        if (id) {
            const likes = await likeService.getLikes(id)
            setLikes(likes)
        }
    }

    const checkLiked = async (id: number, userid: number) => {
        if (id) {
            const isLiked = likes.find((p: LikeModel) => p.userId === Number(userid))

            if (isLiked) {
                setIsLiked(true)
            } else {
                setIsLiked(false)
            }   
        }
    }

    const toggleLike = async (id: number, userid: number) => {
        if (id && userid) {
            const like = await likeService.toggleLike(userid, id)
            setLike(like)
        }
    }

    return {
        isLiked,
        likes,
        like,
        getLikes,
        checkLiked,
        toggleLike
    }
}