import { CommentModel } from '@/models'
import style from '../styles/comment.module.css'

interface propType {
    data : CommentModel
}

export const Comment = ({data}: propType) => {
  return (
    <div className={style.comment}>
        <div className={style.commentText}>
          {/*
            <p>@{data?.user}</p>
          */}
            <p>{data?.text}</p>
        </div>
    </div>
  )
}
