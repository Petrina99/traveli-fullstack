import { CommentModel, LikeModel, PostModel } from "@/models"

import { Link, useNavigate } from "react-router-dom"

interface propTypes {
    data: PostModel,
    isCurrent: boolean,
    handleDelete: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

import commentService from "@/store/comment-store/commentService";

import { useState, useEffect } from "react";

import style from '../styles/userProfile.module.css'

import { useLikeStore } from "@/store";

export const PostDetails: React.FC<propTypes> = (props) => {

    const navigate = useNavigate()

    const { data, isCurrent, handleDelete } = props
    const [comments, setComments] = useState<CommentModel[]>()
    const [currentLikes, setCurrentLikes] = useState<LikeModel[]>([])

    const likes = useLikeStore((state) => state.likes)

    useEffect(() => {
        const fetchData = async () => {
            if (data.id) {
                const comments = await commentService.getAllComments(data.id)
                setComments(comments)

                const fetchedLikes: LikeModel[] = likes.filter((like) => (
                    like.postId === data.id
                ))
                
                setCurrentLikes(fetchedLikes)
            }
        }

        fetchData()
    }, [])

    const handleEdit = () => {
        navigate(`/blog/edit/${data.id}`)
    }

    return (
        <div className={style.postItem}>
            <Link to={`/blog/${data.id}`}>
                <h1>{data.title}</h1>
            </Link>
            <p>{data.date?.slice(0, 10)}</p>
            <p>{currentLikes.length} Likes</p>
            <p>{comments?.length} Comments</p>
            {isCurrent === false ? "" : (
                <div className={style.postItemButtons}>
                    <button 
                        value={data.id}
                        onClick={handleDelete}
                    >
                        Delete post
                    </button>
                    <button onClick={handleEdit}>
                        Edit post
                    </button>
                </div>
            )}
        </div>
    )
}