import { CommentModel } from '@/models'
import style from '../styles/comment.module.css'

import { Link } from 'react-router-dom'

interface propType {
    data : CommentModel
}

import userService from '@/store/user-store/userService'
import commentService from '@/store/comment-store/commentService'

import { useEffect, useState } from 'react'
import { useCommentStore, useUserStore } from '@/store'


export const Comment = ({data}: propType) => {

    const user = useUserStore((state) => state.user)

    const [uname, setUname] = useState("")
    const [isCurrentUser, setIsCurrentUser] = useState(false)

    const deleteComment = useCommentStore((state) => state.deleteComment)

    useEffect(() => {
        if ((user?.id === data.authorId) || (user?.role === "ADMIN")) {
            setIsCurrentUser(true)
        }

        const getProfile = async () => {
            if (data.authorId) {
                const user = await userService.getUser(data.authorId)

                setUname(user.username)
            } 
        }

        getProfile()
    }, [])

    const handleDelete = async () => {
        if (data.id) {
            const deletedComm = await commentService.deleteComment(data.id)
            deleteComment(deletedComm.id)
        }
    }

    return (
        <div className={style.comment}>
            <div className={style.commentText}>
                <Link to={`/profile/${data.authorId}`}>
                    <p>@{uname}</p>
                </Link>
                <p>{data?.text}</p>
                {isCurrentUser === false ? "" : (
                    <button onClick={handleDelete}>
                        Delete
                    </button>
                )}
            </div>
        </div>
    )
}
