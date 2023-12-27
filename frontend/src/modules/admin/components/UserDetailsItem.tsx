import { CommentModel, PostModel, UserModel } from "@/models";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import commentService from "@/store/comment-store/commentService";

import style from '../styles/userDetails.module.css'
import { usePostStore } from "@/store";

interface propTypes {
    data: UserModel;
    handleDelete: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const UserDetailsItem: React.FC<propTypes> = (props) => {
    
    const { data, handleDelete } = props
    
    const posts = usePostStore((state) => state.posts)
    const [comments, setComments] = useState<CommentModel[]>([])
    const [userPosts, setUserPosts] = useState<PostModel[]>([])

    useEffect(() => {
        const fetchComments = async () => {
            if (data.id) {
                const response = await commentService.getAllUserComments(data.id)
                setComments(response)
            }
        }

        const fetchPosts = async () => {
            const result = posts.filter((post) => (
                post.authorId === data.id
            ))

            setUserPosts(result)
        }

        fetchComments()
        fetchPosts()
    }, [])

    return (
        <div className={style.itemLayout}>
            <div className={style.itemInfo}>
                <p>Username: {data.username}</p>
                <p>Email: {data.email}</p>
                <p>Number of comments: {comments?.length}</p>
                <p>Number of posts: {userPosts.length}</p>
                <p>Role: {data.role}</p>
                <Link to={`/profile/${data.id}`}>
                    Go to profile
                </Link>
            </div>
            {data.role === "ADMIN" ? "" : (
                <div className={style.itemDelete}>
                    <button 
                        value={data.id}
                        onClick={handleDelete}
                        className={style.deleteButton}
                    >
                        Delete user
                    </button>
                </div>
            )}
        </div>
    )
}