import { CommentModel } from '@/models'
import style from '../styles/comment.module.css'

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
        if (user?.id === data.authorId) {
            setIsCurrentUser(true)
        }

        const getProfile = async () => {
            if (data.authorId) {
                const user = await userService.getUser(data.authorId)

                console.log(user)
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
                <p>@{uname}</p>
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
