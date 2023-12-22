import { useState } from "react";

import style from '@/views/styles/postSingle.module.css'

import { useCommentStore, useUserStore } from "@/store";
import commentService from '@/store/comment-store/commentService'

interface propTypes {
    data: number
}

export const AddComment = ({data} : propTypes) => {

    const [commValue, setCommValue] = useState("")

    const user = useUserStore((state) => state.user)
    const comments = useCommentStore((state) => state.comments)
    const addComment = useCommentStore((state) => state.addComment)

    const handleTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCommValue(e.target.value);
        console.log(commValue)
    }

    const handleComment = async () => {
        let authorId = user?.id

        if (authorId) {
            let commentData = {
                id: data,
                userid: authorId,
                text: commValue
            }
            const response = await commentService.createComment(commentData)
            addComment(response)
        }

        console.log(comments)
    }

    return (
        <div className={style.addComment}>
            <div className={style.addDiv}>
                <textarea 
                    name="comment" 
                    id="comment" 
                    cols={30} 
                    rows={2}
                    placeholder="Add comment"
                    autoFocus
                    onChange={handleTextarea}
                    value={commValue}
                ></textarea>
                <button 
                    disabled={!commValue}
                    onClick={handleComment}
                >
                    Add
                </button>
            </div>
        </div>
    )
}
