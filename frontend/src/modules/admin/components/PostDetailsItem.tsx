import { CommentModel, LikeModel, PostModel, UserModel } from "@/models";

import { useEffect, useState } from "react";

import { Link, useNavigate } from 'react-router-dom'

interface propTypes {
    data: PostModel;
    handleDelete: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

import commentService from "@/store/comment-store/commentService";
import userService from "@/store/user-store/userService";

import style from '../styles/postDetails.module.css'
import { useLikeStore } from "@/store";

export const PostDetailsItem: React.FC<propTypes> = (props) => {

    const navigate = useNavigate()

    const { data, handleDelete } = props;

    const [currentLikes, setCurrentLikes] = useState<LikeModel[]>([])
    const [comments, setComments] = useState<CommentModel[]>([])
    const [profile, setProfile] = useState<UserModel>()

    const likes = useLikeStore((state) => state.likes)

    useEffect(() => {

        const fetchData = async () => {
            if (data.id) {
                const fetchedComments = await commentService.getAllComments(data.id)
                setComments(fetchedComments)

                const fetchedLikes: LikeModel[] = likes.filter((like) => (
                    like.postId === data.id
                ))

                setCurrentLikes(fetchedLikes)
            }

            if (data.authorId) {
                const userData: UserModel = await userService.getUser(data.authorId)

                setProfile(userData)
            }
        }

        fetchData()
    }, [])

    const handleEdit = () => {
        navigate(`/blog/edit/${data.id}`)
    }

    return (
        <div className={style.postItem}>
            <p>Username: {profile?.username}</p>
            <Link to={`/blog/${data.id}`}>
                <h1>{data.title}</h1>
            </Link>
            <p>{data.date?.slice(0, 10)}</p>
            <p>{currentLikes.length} Likes</p>
            <p>{comments.length} Comments</p>
            <button 
                value={data.id}
                onClick={handleDelete}
            >
                Delete post
            </button>
            <button
                onClick={handleEdit}
            >
                Edit post
            </button>
        </div>
    )
}