import { PostModel } from "@/models"

import { Link } from "react-router-dom"

interface propTypes {
    data: PostModel,
    isCurrent: boolean,
    handleDelete: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
}

import commentService from "@/store/comment-store/commentService";

import { useState, useEffect } from "react";

import style from '../styles/userProfile.module.css'

import { useLike } from "@/modules";

export const PostDetails: React.FC<propTypes> = (props) => {

    const { data, isCurrent, handleDelete } = props
    const [commentsCount, setCommentsCount] = useState()

    const { likes, getLikes } = useLike()

    useEffect(() => {
        const getComments = async () => {
            if (data.id) {
                const comments = await commentService.getAllComments(data.id)
                setCommentsCount(comments.length)
            }
        }

        if (data.id) {
            getLikes(data.id)
        }

        getComments()
    }, [])

    return (
        <div className={style.postItem}>
            <Link to={`/blog/${data.id}`}>
                <h1>{data.title}</h1>
            </Link>
            <p>{data.date?.slice(0, 10)}</p>
            <p>{likes.length} Likes</p>
            <p>{commentsCount} Comments</p>
            {isCurrent === false ? "" : (
                <button 
                value={data.id}
                onClick={handleDelete}
                >
                    Delete
                </button>
            )}
        </div>
    )
}