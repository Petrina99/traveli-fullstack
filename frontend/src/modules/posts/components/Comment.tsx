import style from '../styles/comment.module.css'

interface propType {
    data : {
        id: number;
        text: string;
        user: string;
    }
}

export const Comment = ({data}: propType) => {
  return (
    <div className={style.comment}>
        <div className={style.commentText}>
            <p>@{data?.user}</p>
            <p>{data?.text}</p>
        </div>
    </div>
  )
}
