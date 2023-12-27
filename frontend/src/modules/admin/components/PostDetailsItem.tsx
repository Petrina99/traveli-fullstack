import { PostModel, UserModel } from "@/models";

import { useEffect, useState } from "react";
import { useLike } from "@/modules";

import { Link } from 'react-router-dom'

interface propTypes {
    data: PostModel;
    handleDelete: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

import commentService from "@/store/comment-store/commentService";
import userService from "@/store/user-store/userService";

import style from '../styles/postDetails.module.css'

export const PostDetailsItem: React.FC<propTypes> = (props) => {

    const { data, handleDelete } = props;
    const [commentsCount, setCommentsCount] = useState()
    const [profile, setProfile] = useState<UserModel>()

    const { likes, getLikes } = useLike()

    useEffect(() => {
        const getComments = async () => {
            if (data.id) {
                const comments = await commentService.getAllComments(data.id)
                setCommentsCount(comments.length)
            }
        }

        const fetchUser = async () => {
            if (data.authorId) {
                const response: UserModel = await userService.getUser(data.authorId)

                setProfile(response)
            }
        }

        if (data.id) {
            getLikes(data.id)
        }

        fetchUser()
        getComments()
    }, [])

    return (
        <div className={style.postItem}>
            <p>Username: {profile?.username}</p>
            <Link to={`/blog/${data.id}`}>
                <h1>{data.title}</h1>
            </Link>
            <p>{data.date?.slice(0, 10)}</p>
            <p>{likes.length} Likes</p>
            <p>{commentsCount} Comments</p>
            <button 
                value={data.id}
                onClick={handleDelete}
            >
                Delete post
            </button>
        </div>
    )
}